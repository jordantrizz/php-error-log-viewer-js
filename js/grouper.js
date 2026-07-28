/**
 * grouper.js — Error Grouping by Similarity
 *
 * Groups parsed ErrorEntry objects by normalizing their messages and
 * clustering entries with identical fingerprints into ErrorGroup aggregates.
 *
 * @module grouper
 */

/**
 * @typedef {import('./parser.js').ErrorEntry} ErrorEntry
 */

/**
 * @typedef {Object} ErrorGroup
 * @property {string}       key       - Normalized fingerprint used for grouping
 * @property {number}       count     - Number of occurrences in this group
 * @property {Date|null}    firstSeen - Earliest timestamp in the group
 * @property {Date|null}    lastSeen  - Latest timestamp in the group
 * @property {string}       message   - Representative (denormalized) message
 * @property {ErrorEntry[]} entries   - All raw entries belonging to this group
 */

// ---------------------------------------------------------------------------
// Normalization — replace variable data with typed placeholders
// ---------------------------------------------------------------------------

/**
 * Patterns applied in order to normalize a message into a stable fingerprint.
 * Each pattern replaces a category of variable data with a fixed placeholder.
 *
 * Order matters: more specific patterns (IPs, UUIDs) must run before generic
 * number replacement so we don't fragment IP octets into <NUM>.<NUM>.<NUM>.<NUM>.
 */
const NORMALIZE_PATTERNS = [
  // IPv4 addresses (before generic number replacement)
  { regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,   replacement: '<IP>' },

  // UUIDs (8-4-4-4-12 hex)
  { regex: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, replacement: '<UUID>' },

  // Hex numbers (0x prefix) — before generic number replacement
  { regex: /\b0x[0-9a-f]+\b/gi,                           replacement: '<HEX>' },

  // File paths: /path/to/file.php or C:\path\to\file.php
  { regex: /(?:\/[^\s,;:)]+)+/g,                          replacement: ' <FILE>' },
  { regex: /[A-Za-z]:\\[^\s,;:)]+/g,                      replacement: ' <FILE>' },

  // Numbers with optional decimals and optional leading sign
  { regex: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g,      replacement: '<NUM>' },

  // Email addresses
  { regex: /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi, replacement: '<EMAIL>' },

  // URLs
  { regex: /\bhttps?:\/\/[^\s,;:)]+/gi,                   replacement: '<URL>' },
];

/**
 * Collapse runs of whitespace into single spaces and trim.
 */
const RE_WHITESPACE = /\s+/g;

// ---------------------------------------------------------------------------

/**
 * Normalize an error message into a stable fingerprint string.
 *
 * Replaces all variable data (numbers, IPs, paths, UUIDs, emails, URLs)
 * with typed placeholders, lowercases, and collapses whitespace so that
 * semantically identical messages produce the same fingerprint.
 *
 * @param {string} message - Raw or clean error message
 * @returns {string} Normalized fingerprint
 */
export function normalizeMessage(message) {
  let normalized = message;

  for (const { regex, replacement } of NORMALIZE_PATTERNS) {
    normalized = normalized.replace(regex, replacement);
  }

  // Collapse whitespace and trim
  normalized = normalized.replace(RE_WHITESPACE, ' ').trim().toLowerCase();

  return normalized;
}

/**
 * Choose the best representative message from a group of entries.
 *
 * Prefers the most common exact message string. If there's a tie,
 * picks the one that appears first in the log (earliest occurrence).
 *
 * @param {ErrorEntry[]} entries
 * @returns {string}
 */
function pickRepresentativeMessage(entries) {
  if (entries.length === 1) {
    return entries[0].message;
  }

  // Count occurrences of each exact message string
  /** @type {Map<string, { count: number, firstIdx: number }>} */
  const counts = new Map();

  entries.forEach((entry, idx) => {
    const existing = counts.get(entry.message);
    if (existing) {
      existing.count++;
    } else {
      counts.set(entry.message, { count: 1, firstIdx: idx });
    }
  });

  // Find the message with the highest count; break ties by firstIdx
  let best = entries[0].message;
  let bestCount = 0;
  let bestIdx = Infinity;

  for (const [msg, { count, firstIdx }] of counts) {
    if (count > bestCount || (count === bestCount && firstIdx < bestIdx)) {
      best = msg;
      bestCount = count;
      bestIdx = firstIdx;
    }
  }

  return best;
}

// ---------------------------------------------------------------------------
// Main grouper
// ---------------------------------------------------------------------------

/**
 * Group an array of ErrorEntry objects into ErrorGroup aggregates.
 *
 * Entries with the same normalized message fingerprint are folded together.
 * Stack trace entries (severity === 'Stack') are attached to the preceding
 * non-stack parent entry so they appear together when expanded.
 *
 * Groups are sorted by count descending, then by lastSeen descending.
 *
 * @param {ErrorEntry[]} entries - Parsed error entries from parser.js
 * @returns {ErrorGroup[]}
 */
export function groupErrors(entries) {
  if (!entries || entries.length === 0) {
    return [];
  }

  /** @type {Map<string, ErrorEntry[]>} */
  const groups = new Map();

  let lastNonStackKey = null;

  for (const entry of entries) {
    let key;

    if (entry.severity === 'Stack' && lastNonStackKey !== null) {
      // Attach stack trace lines to the preceding parent error group
      key = lastNonStackKey;
    } else {
      key = normalizeMessage(entry.message);
      lastNonStackKey = key;
    }

    const existing = groups.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      groups.set(key, [entry]);
    }
  }

  /** @type {ErrorGroup[]} */
  const result = [];

  for (const [key, groupEntries] of groups) {
    // Compute time range
    const timestamps = groupEntries
      .map((e) => e.timestamp)
      .filter((t) => t !== null);

    const firstSeen = timestamps.length > 0
      ? new Date(Math.min(...timestamps.map((t) => t.getTime())))
      : null;

    const lastSeen = timestamps.length > 0
      ? new Date(Math.max(...timestamps.map((t) => t.getTime())))
      : null;

    const message = pickRepresentativeMessage(groupEntries);

    result.push({
      key,
      count: groupEntries.length,
      firstSeen,
      lastSeen,
      message,
      entries: groupEntries,
    });
  }

  // Sort: count descending, then lastSeen descending (newest first)
  result.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    // Both may have null timestamps — nulls sort last
    if (a.lastSeen === null && b.lastSeen === null) return 0;
    if (a.lastSeen === null) return 1;
    if (b.lastSeen === null) return -1;
    return b.lastSeen.getTime() - a.lastSeen.getTime();
  });

  return result;
}
