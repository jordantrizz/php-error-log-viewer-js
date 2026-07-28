/**
 * parser.js — PHP Error Log Parser
 *
 * Parses raw PHP error log text into an array of structured ErrorEntry objects.
 * Supports multiple common PHP log formats and handles malformed lines gracefully.
 *
 * @module parser
 */

/**
 * @typedef {Object} ErrorEntry
 * @property {string}  raw       - The original, unmodified log line
 * @property {Date|null} timestamp - Parsed datetime, or null if unparseable
 * @property {string}  message   - Normalized error message (no file/line, no timestamp)
 * @property {string}  severity  - Error severity level (Fatal, Warning, Notice, etc.)
 * @property {string|null} file  - Source file path, or null if not present
 * @property {number|null} line  - Source line number, or null if not present
 */

// ---------------------------------------------------------------------------
// Regex patterns — built once, reused across all lines
// ---------------------------------------------------------------------------

/**
 * Matches the standard PHP timestamp bracket: [dd-Mmm-yyyy HH:MM:SS TZ]
 * Examples:
 *   [27-Jul-2026 14:32:01 UTC]
 *   [27-Jul-2026 14:32:01 America/Chicago]
 *   [27-Jul-2026 14:32:01]
 *
 * Groups: 1=day, 2=month_abbr, 3=year, 4=time, 5=timezone_suffix
 */
const RE_TIMESTAMP = /^\[(\d{2})-([A-Z][a-z]{2})-(\d{4})\s+(\d{2}:\d{2}:\d{2})(?:\s+(\S+))?\]/;

/**
 * Month abbreviation → zero-based month index.
 * PHP uses three-letter English month abbreviations.
 */
const MONTH_MAP = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

// ---------------------------------------------------------------------------

/**
 * PHP severity keywords and their canonical labels.
 * Ordered by specificity — longer/more-specific patterns are tried first
 * so that "Fatal error" matches before "error" alone.
 */
const SEVERITY_PATTERNS = [
  { regex: /PHP\s+Fatal\s+error:\s*/i,          label: 'Fatal' },
  { regex: /PHP\s+Parse\s+error:\s*/i,          label: 'Parse' },
  { regex: /PHP\s+Warning:\s*/i,                 label: 'Warning' },
  { regex: /PHP\s+Notice:\s*/i,                  label: 'Notice' },
  { regex: /PHP\s+Deprecated:\s*/i,              label: 'Deprecated' },
  { regex: /PHP\s+Strict\s+Standards:\s*/i,      label: 'Strict' },
  { regex: /PHP\s+Catchable\s+fatal\s+error:\s*/i, label: 'Catchable Fatal' },
  { regex: /PHP\s+Recoverable\s+fatal\s+error:\s*/i, label: 'Recoverable Fatal' },
  { regex: /PHP\s+User\s+Error:\s*/i,            label: 'User Error' },
  { regex: /PHP\s+User\s+Warning:\s*/i,          label: 'User Warning' },
  { regex: /PHP\s+User\s+Notice:\s*/i,           label: 'User Notice' },
  { regex: /PHP\s+User\s+Deprecated:\s*/i,       label: 'User Deprecated' },
  // Generic fallback — matches lines starting with "PHP " not caught above
  { regex: /^PHP\s+(.+?):\s*/i,                  label: 'PHP' },
  // Bare severity keywords (no "PHP" prefix)
  { regex: /^Fatal\s+error:\s*/i,                label: 'Fatal' },
  { regex: /^Warning:\s*/i,                      label: 'Warning' },
  { regex: /^Notice:\s*/i,                       label: 'Notice' },
  { regex: /^Parse\s+error:\s*/i,                label: 'Parse' },
  { regex: /^Deprecated:\s*/i,                   label: 'Deprecated' },
];

/**
 * Extracts the file path and line number from patterns like:
 *   in /var/www/html/index.php on line 42
 *   in /var/www/html/index.php:42
 *
 * Groups: 1=file_path, 2=line_number (optional, depending on format)
 */
const RE_FILE_LINE_A = /\s+in\s+(\/[^\s]+?)(?:\s+on\s+line\s+(\d+))?/i;
const RE_FILE_LINE_B = /\s+in\s+([^\s:]+):(\d+)/i;

/**
 * Matches a stack trace header line.
 * Examples:
 *   Stack trace:
 *   #0 /path/file.php(123): Class->method()
 */
const RE_STACK_HEADER = /^Stack\s+trace:\s*$/i;

/**
 * Matches a stack trace frame line.
 * Examples:
 *   #0 /path/file.php(123): ClassName->methodName()
 *   #1 /path/file.php(456): functionName()
 *   #2 {main}
 *   thrown in /path/file.php on line 42
 */
const RE_STACK_FRAME = /^(#\d+)\s+/;

/**
 * Matches a "thrown in" line (exception re-throw / uncaught marker).
 */
const RE_THROWN_IN = /^\s*(?:thrown|Thrown)\s+in\s+/;

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

/**
 * Parse a PHP log timestamp string into a Date object.
 *
 * Handles the optional timezone suffix. If no timezone is given, the date
 * is interpreted as UTC (which is PHP's default log behavior).
 *
 * @param {string} day    - Two-digit day (e.g. "27")
 * @param {string} month  - Three-letter month abbreviation (e.g. "Jul")
 * @param {string} year   - Four-digit year (e.g. "2026")
 * @param {string} time   - HH:MM:SS string (e.g. "14:32:01")
 * @param {string|undefined} tzSuffix - Optional timezone string
 * @returns {Date}
 */
function parseTimestamp(day, month, year, time, tzSuffix) {
  const monthIdx = MONTH_MAP[month];
  if (monthIdx === undefined) {
    // Unknown month abbreviation — fall back to parsing as ISO-ish
    const isoStr = `${year}-${month}-${day}T${time}Z`;
    const d = new Date(isoStr);
    return isNaN(d.getTime()) ? null : d;
  }

  // Build an ISO-8601 string and let the runtime parse it.
  // Pad month and day to two digits.
  const mm = String(monthIdx + 1).padStart(2, '0');
  const dd = day.padStart(2, '0');

  if (tzSuffix) {
    // Try to parse with the named timezone. Since the Date constructor
    // doesn't accept IANA timezone names, we build a full ISO string
    // and use `new Date()` which parses the instant correctly when the
    // offset is embedded. For named zones we fall back to a locale-aware
    // approach or treat-as-UTC with a note.
    //
    // Attempt 1: if tzSuffix looks like an offset (+HHMM / -HHMM)
    const offsetMatch = tzSuffix.match(/^([+-]\d{2}:?\d{2})$/);
    if (offsetMatch) {
      const offset = offsetMatch[1].replace(/(\d{2})(\d{2})$/, ':$1');
      return new Date(`${year}-${mm}-${dd}T${time}${offset}`);
    }
    // Attempt 2: treat as UTC and tag it (the timezone selector will
    // allow the user to reinterpret). PHP logs default to the server
    // timezone; without offset info we store as-is (UTC-interpreted).
    return new Date(`${year}-${mm}-${dd}T${time}Z`);
  }

  // No timezone suffix — treat as UTC (PHP default).
  return new Date(`${year}-${mm}-${dd}T${time}Z`);
}

/**
 * Try to extract a file path and line number from a message string.
 * Returns { file, line } with nulls if not found.
 *
 * @param {string} message
 * @returns {{ file: string|null, line: number|null }}
 */
function extractFileLine(message) {
  // Pattern A: "in /path/to/file.php on line 42"
  let m = message.match(RE_FILE_LINE_A);
  if (m) {
    return {
      file: m[1] || null,
      line: m[2] ? parseInt(m[2], 10) : null,
    };
  }
  // Pattern B: "in /path/to/file.php:42"
  m = message.match(RE_FILE_LINE_B);
  if (m) {
    return {
      file: m[1] || null,
      line: m[2] ? parseInt(m[2], 10) : null,
    };
  }
  return { file: null, line: null };
}

/**
 * Strip the file/line suffix from a message string so that only the
 * human-readable error description remains.
 *
 * @param {string} message
 * @returns {string}
 */
function stripFileLine(message) {
  return message
    .replace(/\s+in\s+\/[^\s]+?\s+on\s+line\s+\d+/i, '')
    .replace(/\s+in\s+[^\s:]+:\d+/i, '')
    .trim();
}

// ---------------------------------------------------------------------------
// Main parser
// ---------------------------------------------------------------------------

/**
 * Parse a raw PHP error log string into an array of structured ErrorEntry
 * objects. Lines that don't match any known pattern are still included
 * with `timestamp: null` and `severity: 'Unknown'`.
 *
 * Stack trace lines are attached as-is but tagged as severity 'Stack'.
 *
 * @param {string} rawText - The full text of a PHP error log
 * @returns {ErrorEntry[]}
 */
export function parseLog(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return [];
  }

  const lines = rawText.split(/\r?\n/);
  /** @type {ErrorEntry[]} */
  const entries = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // Skip completely blank lines
    if (raw.trim() === '') {
      continue;
    }

    const entry = parseLine(raw);
    if (entry) {
      entries.push(entry);
    }
  }

  return entries;
}

/**
 * Parse a single log line into an ErrorEntry (or null if the line
 * should be skipped entirely).
 *
 * @param {string} raw - A single line from the log
 * @returns {ErrorEntry|null}
 */
function parseLine(raw) {
  // --- Stack trace header ---
  if (RE_STACK_HEADER.test(raw.trim())) {
    return {
      raw,
      timestamp: null,
      message: raw.trim(),
      severity: 'Stack',
      file: null,
      line: null,
    };
  }

  // --- Stack frame line ---
  if (RE_STACK_FRAME.test(raw)) {
    return {
      raw,
      timestamp: null,
      message: raw.trim(),
      severity: 'Stack',
      file: null,
      line: null,
    };
  }

  // --- "thrown in" line ---
  if (RE_THROWN_IN.test(raw.trim())) {
    return {
      raw,
      timestamp: null,
      message: raw.trim(),
      severity: 'Stack',
      file: null,
      line: null,
    };
  }

  // --- Regular log line ---
  let working = raw;
  let timestamp = null;

  // Step 1: Try to extract a timestamp bracket at the start and strip it
  const tsMatch = working.match(RE_TIMESTAMP);
  if (tsMatch) {
    timestamp = parseTimestamp(
      tsMatch[1], tsMatch[2], tsMatch[3], tsMatch[4], tsMatch[5]
    );
    // Remove the matched timestamp prefix from the working string
    working = working.slice(tsMatch[0].length).trim();
  }

  // Step 2: Detect severity from the PHP-prefixed pattern
  let severity = 'Unknown';
  let messageBody = working;

  for (const { regex, label } of SEVERITY_PATTERNS) {
    const m = messageBody.match(regex);
    if (m) {
      severity = label;
      // If the pattern has a capture group for the message, use it;
      // otherwise strip the matched prefix.
      if (m[1]) {
        // For the generic `^PHP (.+?): ` pattern, m[1] is the severity
        // name and we want everything after the colon+space.
        messageBody = messageBody.slice(m[0].length).trim();
      } else {
        messageBody = messageBody.slice(m[0].length).trim();
      }
      break;
    }
  }

  // Step 3: Extract file and line, then strip them from the message
  const { file, line } = extractFileLine(messageBody);
  const cleanMessage = stripFileLine(messageBody);

  // Step 4: If no severity was detected and the line doesn't start with
  //         "[timestamp]", check for common patterns.
  if (severity === 'Unknown' && !tsMatch) {
    // Try to detect bare severity keywords anywhere in the line
    if (/\bfatal\s+error\b/i.test(raw)) {
      severity = 'Fatal';
    } else if (/\bparse\s+error\b/i.test(raw)) {
      severity = 'Parse';
    } else if (/\bwarning\b/i.test(raw)) {
      severity = 'Warning';
    } else if (/\bnotice\b/i.test(raw)) {
      severity = 'Notice';
    } else if (/\bdeprecated\b/i.test(raw)) {
      severity = 'Deprecated';
    }
  }

  return {
    raw,
    timestamp,
    message: cleanMessage || messageBody || raw,
    severity,
    file,
    line,
  };
}
