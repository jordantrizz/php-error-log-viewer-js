/**
 * ui.js — DOM Rendering & Interactivity
 *
 * Handles all DOM manipulation: rendering the results table, updating the
 * stats bar, toggling empty states, managing sort state, expand/collapse
 * of error groups, and CSV export.
 *
 * @module ui
 */

import { formatTimestamp } from './timezone.js';
import { escapeHtml } from './utils.js';

// ---------------------------------------------------------------------------
// DOM references — cached on first use
// ---------------------------------------------------------------------------

/** @type {HTMLElement} */
let tableContainer;
/** @type {HTMLTableSectionElement} */
let tbody;
/** @type {HTMLElement} */
let emptyState;
/** @type {HTMLElement} */
let statsBar;
/** @type {HTMLElement} */
let statTotalErrors;
/** @type {HTMLElement} */
let statTotalGroups;
/** @type {HTMLElement} */
let statTimeRange;
/** @type {HTMLButtonElement} */
let exportBtn;
/** @type {HTMLButtonElement} */
let clearBtn;
/** @type {HTMLTableElement} */
let table;

/**
 * Resolve and cache DOM element references.
 * Safe to call multiple times.
 */
function cacheDom() {
  if (tableContainer) return; // Already cached
  tableContainer = document.getElementById('table-container');
  tbody = document.getElementById('results-tbody');
  emptyState = document.getElementById('empty-state');
  statsBar = document.getElementById('stats-bar');
  statTotalErrors = document.getElementById('stat-total-errors');
  statTotalGroups = document.getElementById('stat-total-groups');
  statTimeRange = document.getElementById('stat-time-range');
  exportBtn = document.getElementById('export-btn');
  clearBtn = document.getElementById('clear-btn');
  table = document.getElementById('results-table');
}

// ---------------------------------------------------------------------------
// Sort state
// ---------------------------------------------------------------------------

/**
 * Current sort configuration.
 * @type {{ column: string, direction: 'asc'|'desc' }}
 */
let sortState = { column: 'count', direction: 'desc' };

/** @type {import('./grouper.js').ErrorGroup[]} */
let currentGroups = [];

/** @type {string} */
let currentTimezone = 'UTC';

// ---------------------------------------------------------------------------
// Severity tag helpers
// ---------------------------------------------------------------------------

/**
 * Map severity strings to CSS class suffixes.
 * @param {string} severity
 * @returns {string}
 */
function severityCssClass(severity) {
  const map = {
    'Fatal':            'sev-fatal',
    'Parse':            'sev-parse',
    'Warning':          'sev-warning',
    'Notice':           'sev-notice',
    'Deprecated':       'sev-deprecated',
    'Strict':           'sev-deprecated',
    'Catchable Fatal':  'sev-fatal',
    'Recoverable Fatal':'sev-fatal',
    'User Error':       'sev-fatal',
    'User Warning':     'sev-warning',
    'User Notice':      'sev-notice',
    'User Deprecated':  'sev-deprecated',
    'Stack':            'sev-unknown',
    'PHP':              'sev-unknown',
    'Unknown':          'sev-unknown',
  };
  return map[severity] || 'sev-unknown';
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/**
 * Render the full results table from an array of ErrorGroup objects.
 *
 * @param {import('./grouper.js').ErrorGroup[]} groups
 * @param {string} timezone - IANA timezone string for formatting timestamps
 */
export function renderGroups(groups, timezone) {
  cacheDom();
  currentGroups = groups;
  currentTimezone = timezone;

  if (!groups || groups.length === 0) {
    showEmptyState();
    return;
  }

  hideEmptyState();
  tableContainer.hidden = false;

  // Apply current sort
  const sorted = sortGroups(groups, sortState.column, sortState.direction);

  // Build rows
  tbody.innerHTML = '';

  for (const group of sorted) {
    const groupRow = buildGroupRow(group, timezone);
    tbody.appendChild(groupRow);

    // Child rows (hidden initially)
    for (const entry of group.entries) {
      const childRow = buildChildRow(entry, timezone, group.key);
      childRow.hidden = true;
      childRow.classList.add('child-row');
      childRow.dataset.parentKey = group.key;
      tbody.appendChild(childRow);
    }
  }

  // Update sort indicators
  updateSortIndicators();

  // Update stats
  updateStatsFromGroups(groups);
}

/**
 * Build a single group (summary) table row.
 *
 * @param {import('./grouper.js').ErrorGroup} group
 * @param {string} timezone
 * @returns {HTMLTableRowElement}
 */
function buildGroupRow(group, timezone) {
  const tr = document.createElement('tr');
  tr.classList.add('group-row');
  tr.dataset.groupKey = group.key;
  tr.tabIndex = 0;
  tr.setAttribute('aria-expanded', 'false');
  tr.setAttribute('role', 'button');

  // --- Count cell ---
  const tdCount = document.createElement('td');
  tdCount.classList.add('count-cell');

  const badge = document.createElement('span');
  badge.classList.add('count-badge');
  if (group.count >= 10) {
    badge.classList.add('high-count');
  }
  badge.textContent = String(group.count);

  const indicator = document.createElement('span');
  indicator.classList.add('expand-indicator');
  indicator.textContent = '▶';
  indicator.setAttribute('aria-hidden', 'true');

  tdCount.appendChild(indicator);
  tdCount.appendChild(badge);
  tr.appendChild(tdCount);

  // --- Time cell ---
  const tdTime = document.createElement('td');
  tdTime.classList.add('time-cell');

  const timeDiv = document.createElement('div');
  const firstStr = group.firstSeen
    ? formatTimestamp(group.firstSeen, timezone)
    : '—';
  const lastStr = group.lastSeen
    ? formatTimestamp(group.lastSeen, timezone)
    : '—';
  timeDiv.textContent = firstStr;
  tdTime.appendChild(timeDiv);

  if (group.count > 1 && group.firstSeen && group.lastSeen &&
      group.firstSeen.getTime() !== group.lastSeen.getTime()) {
    const lastDiv = document.createElement('div');
    lastDiv.textContent = 'to ' + lastStr;
    lastDiv.style.opacity = '0.7';
    tdTime.appendChild(lastDiv);
  }

  tr.appendChild(tdTime);

  // --- Message cell ---
  const tdMsg = document.createElement('td');
  tdMsg.classList.add('message-cell');

  // Get the most common *non-stack* severity in the group for the tag
  const sevCounts = new Map();
  for (const e of group.entries) {
    if (e.severity === 'Stack') continue; // Stack lines are supplementary
    sevCounts.set(e.severity, (sevCounts.get(e.severity) || 0) + 1);
  }
  let dominantSev = '';
  let maxC = 0;
  for (const [sev, c] of sevCounts) {
    if (c > maxC) {
      maxC = c;
      dominantSev = sev;
    }
  }

  if (dominantSev && dominantSev !== 'Unknown') {
    const tag = document.createElement('span');
    tag.classList.add('severity-tag', severityCssClass(dominantSev));
    tag.textContent = dominantSev;
    tdMsg.appendChild(tag);
  }

  tdMsg.appendChild(document.createTextNode(group.message));
  tr.appendChild(tdMsg);

  return tr;
}

/**
 * Build a single child (expanded detail) row for an individual error entry.
 *
 * @param {import('./parser.js').ErrorEntry} entry
 * @param {string} timezone
 * @param {string} parentKey
 * @returns {HTMLTableRowElement}
 */
function buildChildRow(entry, timezone, parentKey) {
  const tr = document.createElement('tr');
  tr.classList.add('expanded-row');
  tr.dataset.parentKey = parentKey;

  const td = document.createElement('td');
  td.colSpan = 3;
  td.classList.add('child-entry');

  // Time prefix
  if (entry.timestamp) {
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('child-time');
    timeSpan.textContent = formatTimestamp(entry.timestamp, timezone);
    td.appendChild(timeSpan);
  }

  // Severity tag
  if (entry.severity !== 'Unknown') {
    const tag = document.createElement('span');
    tag.classList.add('severity-tag', severityCssClass(entry.severity));
    tag.textContent = entry.severity;
    td.appendChild(tag);
    td.appendChild(document.createTextNode(' '));
  }

  // Full raw line (escaped)
  const code = document.createElement('code');
  code.textContent = entry.raw;  // textContent auto-escapes
  td.appendChild(code);

  tr.appendChild(td);
  return tr;
}

/**
 * Update sort indicator arrows on column headers to reflect current sortState.
 */
function updateSortIndicators() {
  const headers = table.querySelectorAll('th.sortable');
  for (const th of headers) {
    const col = th.dataset.sort;
    const indicator = th.querySelector('.sort-indicator');
    if (col === sortState.column) {
      th.setAttribute('aria-sort',
        sortState.direction === 'asc' ? 'ascending' : 'descending');
      if (indicator) {
        indicator.textContent = sortState.direction === 'asc' ? '▲' : '▼';
      }
    } else {
      th.removeAttribute('aria-sort');
      if (indicator) {
        indicator.textContent = '';
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

/**
 * Sort an array of groups by a given column and direction.
 * Returns a new sorted array (does not mutate the original).
 *
 * @param {import('./grouper.js').ErrorGroup[]} groups
 * @param {string} column - 'count', 'time', or 'message'
 * @param {'asc'|'desc'} direction
 * @returns {import('./grouper.js').ErrorGroup[]}
 */
function sortGroups(groups, column, direction) {
  const sorted = [...groups];
  const multiplier = direction === 'asc' ? 1 : -1;

  sorted.sort((a, b) => {
    switch (column) {
      case 'count':
        return (a.count - b.count) * multiplier;

      case 'time': {
        const aTime = a.lastSeen ? a.lastSeen.getTime() : 0;
        const bTime = b.lastSeen ? b.lastSeen.getTime() : 0;
        return (aTime - bTime) * multiplier;
      }

      case 'message': {
        const aMsg = a.message.toLowerCase();
        const bMsg = b.message.toLowerCase();
        if (aMsg < bMsg) return -1 * multiplier;
        if (aMsg > bMsg) return 1 * multiplier;
        return 0;
      }

      default:
        return 0;
    }
  });

  return sorted;
}

/**
 * Set the sort column/direction and re-render.
 *
 * @param {string} column
 */
export function setSort(column) {
  cacheDom();

  if (sortState.column === column) {
    // Toggle direction
    sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortState.column = column;
    // Default: count & time → desc, message → asc
    sortState.direction = (column === 'message') ? 'asc' : 'desc';
  }

  // Re-render with current groups
  if (currentGroups.length > 0) {
    renderGroups(currentGroups, currentTimezone);
  }
}

// ---------------------------------------------------------------------------
// Expand / Collapse
// ---------------------------------------------------------------------------

/**
 * Toggle expand/collapse for a group row.
 *
 * @param {HTMLElement} groupRow - The <tr class="group-row"> element
 */
export function toggleExpand(groupRow) {
  const key = groupRow.dataset.groupKey;
  if (!key) return;

  const childRows = tbody.querySelectorAll(`[data-parent-key="${CSS.escape(key)}"]`);
  const isExpanded = groupRow.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    // Collapse
    groupRow.setAttribute('aria-expanded', 'false');
    groupRow.classList.remove('expanded');
    for (const row of childRows) {
      row.hidden = true;
    }
  } else {
    // Expand
    groupRow.setAttribute('aria-expanded', 'true');
    groupRow.classList.add('expanded');
    for (const row of childRows) {
      row.hidden = false;
    }
  }
}

// ---------------------------------------------------------------------------
// Stats Bar
// ---------------------------------------------------------------------------

/**
 * Update the stats bar from the current groups array.
 *
 * @param {import('./grouper.js').ErrorGroup[]} groups
 */
function updateStatsFromGroups(groups) {
  const totalErrors = groups.reduce((sum, g) => sum + g.count, 0);
  const totalGroups = groups.length;

  let timeRange = '—';
  const allTimestamps = groups
    .flatMap((g) => g.entries)
    .map((e) => e.timestamp)
    .filter((t) => t !== null);

  if (allTimestamps.length > 0) {
    const min = new Date(Math.min(...allTimestamps.map((t) => t.getTime())));
    const max = new Date(Math.max(...allTimestamps.map((t) => t.getTime())));
    const minStr = formatTimestamp(min, currentTimezone);
    if (min.getTime() === max.getTime()) {
      timeRange = minStr;
    } else {
      const maxStr = formatTimestamp(max, currentTimezone);
      timeRange = `${minStr} — ${maxStr}`;
    }
  }

  updateStats(totalErrors, totalGroups, timeRange);
}

/**
 * Update the stats bar display.
 *
 * @param {number} totalErrors
 * @param {number} totalGroups
 * @param {string} timeRange
 */
export function updateStats(totalErrors, totalGroups, timeRange) {
  cacheDom();
  statTotalErrors.textContent = totalErrors.toLocaleString();
  statTotalGroups.textContent = totalGroups.toLocaleString();
  statTimeRange.textContent = timeRange;

  // Enable action buttons
  const hasData = totalErrors > 0;
  exportBtn.disabled = !hasData;
  clearBtn.disabled = !hasData;

  // Update footer
  const footerStats = document.getElementById('footer-stats');
  if (footerStats) {
    if (hasData) {
      footerStats.textContent = `${totalErrors} error${totalErrors !== 1 ? 's' : ''} in ${totalGroups} group${totalGroups !== 1 ? 's' : ''}`;
    } else {
      footerStats.textContent = 'Ready';
    }
  }
}

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

/** Show the empty-state placeholder and hide the table. */
export function showEmptyState() {
  cacheDom();
  emptyState.hidden = false;
  tableContainer.hidden = true;
  updateStats(0, 0, '—');
}

/** Hide the empty-state placeholder. */
export function hideEmptyState() {
  cacheDom();
  emptyState.hidden = true;
}

// ---------------------------------------------------------------------------
// Export — CSV
// ---------------------------------------------------------------------------

/**
 * Build a CSV string from the current groups and copy it to the clipboard.
 *
 * Columns: Count, First Seen, Last Seen, Severity, Message, File, Line
 *
 * @returns {Promise<string>} The CSV content that was copied
 */
export async function exportCSV() {
  if (currentGroups.length === 0) {
    throw new Error('No data to export');
  }

  const header = ['Count', 'First Seen', 'Last Seen', 'Severity', 'Message', 'File', 'Line'];
  const rows = [header.join(',')];

  for (const group of currentGroups) {
    for (const entry of group.entries) {
      const first = group.firstSeen ? formatTimestamp(group.firstSeen, currentTimezone) : '';
      const last = group.lastSeen ? formatTimestamp(group.lastSeen, currentTimezone) : '';
      const cells = [
        String(group.count),
        csvEscape(first),
        csvEscape(last),
        csvEscape(entry.severity),
        csvEscape(entry.message),
        csvEscape(entry.file || ''),
        entry.line !== null ? String(entry.line) : '',
      ];
      rows.push(cells.join(','));
    }
  }

  const csv = rows.join('\n');

  // Copy to clipboard
  try {
    await navigator.clipboard.writeText(csv);
  } catch {
    // Fallback for older browsers or non-HTTPS contexts
    const textarea = document.createElement('textarea');
    textarea.value = csv;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  return csv;
}

/**
 * Escape a field value for CSV output.
 * Wraps in quotes if the value contains commas, quotes, or newlines.
 *
 * @param {string} val
 * @returns {string}
 */
function csvEscape(val) {
  if (!val) return '';
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}
