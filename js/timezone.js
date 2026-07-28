/**
 * timezone.js — Timezone Selector & Date Formatting
 *
 * Builds a timezone picker from the IANA timezone database (via
 * Intl.supportedValuesOf) and provides locale-aware timestamp formatting.
 *
 * @module timezone
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'php-error-log-viewer:timezone';

/**
 * Fallback list of common timezones used when Intl.supportedValuesOf is
 * unavailable (Safari < 15.4, older browsers).
 */
const FALLBACK_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Anchorage',
  'Pacific/Honolulu',
  'America/Toronto',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'America/Buenos_Aires',
  'America/Santiago',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Madrid',
  'Europe/Rome',
  'Europe/Amsterdam',
  'Europe/Stockholm',
  'Europe/Moscow',
  'Europe/Istanbul',
  'Africa/Cairo',
  'Africa/Lagos',
  'Africa/Johannesburg',
  'Africa/Nairobi',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Asia/Bangkok',
  'Asia/Singapore',
  'Asia/Shanghai',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Asia/Hong_Kong',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Australia/Perth',
  'Pacific/Auckland',
  'Pacific/Fiji',
];

// ---------------------------------------------------------------------------
// Timezone list resolution
// ---------------------------------------------------------------------------

/**
 * Get the list of IANA timezone identifiers available on this system.
 * Uses Intl.supportedValuesOf when available, falls back to a curated list.
 *
 * @returns {string[]}
 */
export function getAvailableTimezones() {
  if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
    try {
      return Intl.supportedValuesOf('timeZone');
    } catch {
      // Fall through to fallback
    }
  }
  return FALLBACK_TIMEZONES;
}

/**
 * Determine the user's local IANA timezone.
 *
 * @returns {string}
 */
export function getLocalTimezone() {
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return 'UTC';
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

/**
 * Get the saved timezone from localStorage, or the local timezone as default.
 *
 * @returns {string}
 */
export function getSavedTimezone() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  return getLocalTimezone();
}

/**
 * Persist the selected timezone to localStorage.
 *
 * @param {string} tz - IANA timezone string
 */
export function saveTimezone(tz) {
  try {
    localStorage.setItem(STORAGE_KEY, tz);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

// ---------------------------------------------------------------------------
// Select element builder
// ---------------------------------------------------------------------------

/**
 * Populate a <select> element with all available timezones, organized into
 * <optgroup> elements by region (e.g., "America", "Europe", "Asia").
 *
 * The currently saved (or local) timezone is pre-selected.
 *
 * @param {HTMLSelectElement} selectEl - The <select> to populate
 * @returns {string} The selected timezone value
 */
export function buildTimezoneSelect(selectEl) {
  const timezones = getAvailableTimezones();
  const saved = getSavedTimezone();

  // Group timezones by continent/region prefix
  /** @type {Map<string, string[]>} */
  const groups = new Map();

  for (const tz of timezones) {
    const slashIdx = tz.indexOf('/');
    const region = slashIdx > 0 ? tz.slice(0, slashIdx) : 'Other';
    if (!groups.has(region)) {
      groups.set(region, []);
    }
    groups.get(region).push(tz);
  }

  // Sort regions (UTC first, then alphabetically)
  const regionOrder = [...groups.keys()].sort((a, b) => {
    if (a === 'UTC') return -1;
    if (b === 'UTC') return 1;
    return a.localeCompare(b);
  });

  // Build options
  selectEl.innerHTML = '';

  for (const region of regionOrder) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = region;

    const cities = groups.get(region);
    // Sort cities within region
    cities.sort();

    for (const tz of cities) {
      const option = document.createElement('option');
      option.value = tz;

      // Show just the city part as the label
      const slashIdx = tz.indexOf('/');
      const label = slashIdx > 0 ? tz.slice(slashIdx + 1).replace(/_/g, ' ') : tz;
      option.textContent = label;

      if (tz === saved) {
        option.selected = true;
      }

      optgroup.appendChild(option);
    }

    selectEl.appendChild(optgroup);
  }

  return saved;
}

// ---------------------------------------------------------------------------
// Timestamp formatting
// ---------------------------------------------------------------------------

/**
 * Format a Date object into a human-readable string in the given timezone.
 *
 * Format: "27 Jul 2026, 14:32:01 EDT" or similar locale-appropriate form.
 *
 * @param {Date} date - The date to format
 * @param {string} timezone - IANA timezone string (e.g., "America/Chicago")
 * @returns {string} Formatted timestamp string
 */
export function formatTimestamp(date, timezone) {
  if (!date || isNaN(date.getTime())) {
    return '—';
  }

  try {
    // Use Intl.DateTimeFormat for locale-aware, timezone-aware formatting
    const formatter = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone,
      timeZoneName: 'short',
    });

    return formatter.format(date);
  } catch {
    // If the timezone is invalid, fall back to UTC
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short',
      }).format(date);
    } catch {
      // Absolute last resort
      return date.toISOString();
    }
  }
}
