/**
 * app.js — Application Bootstrap & Event Wiring
 *
 * Top-level orchestrator: initialises the UI, wires up all event listeners,
 * and coordinates the data flow through parser → grouper → renderer.
 *
 * @module app
 */

import { parseLog } from './parser.js';
import { groupErrors } from './grouper.js';
import { renderGroups, showEmptyState, setSort, toggleExpand, exportCSV, updateStats } from './ui.js';
import { buildTimezoneSelect, getSavedTimezone, saveTimezone } from './timezone.js';
import { debounce, readFileAsText, downloadAsFile } from './utils.js';

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

/** @type {import('./grouper.js').ErrorGroup[]} */
let currentGroups = [];

/** @type {string} */
let currentTimezone;

/** AbortController for cancelling in-flight URL fetches */
let fetchAbortController = null;

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

/** @returns {HTMLSelectElement} */
const timezoneSelect = () => document.getElementById('timezone-select');

/** @returns {HTMLInputElement} */
const fileInput = () => document.getElementById('file-input');

/** @returns {HTMLTextAreaElement} */
const pasteTextarea = () => document.getElementById('paste-textarea');

/** @returns {HTMLInputElement} */
const urlInput = () => document.getElementById('url-input');

/** @returns {HTMLButtonElement} */
const urlFetchBtn = () => document.getElementById('url-fetch-btn');

/** @returns {HTMLElement} */
const urlStatus = () => document.getElementById('url-status');

/** @returns {HTMLButtonElement} */
const exportBtn = () => document.getElementById('export-btn');

/** @returns {HTMLButtonElement} */
const clearBtn = () => document.getElementById('clear-btn');

/** @returns {HTMLTableSectionElement} */
const tbody = () => document.getElementById('results-tbody');

/** @returns {HTMLElement} */
const dropZone = () => document.getElementById('drop-zone');

// ---------------------------------------------------------------------------
// Data pipeline
// ---------------------------------------------------------------------------

/**
 * Run the full pipeline on a raw log string: parse → group → render.
 *
 * @param {string} rawText - Raw PHP error log content
 * @param {string} [source] - Label describing the source (for logging only)
 */
function processLog(rawText, source = 'input') {
  if (!rawText || rawText.trim().length === 0) {
    showEmptyState();
    currentGroups = [];
    return;
  }

  console.log(`Processing ${(rawText.length / 1024).toFixed(1)} KB from ${source}…`);

  const t0 = performance.now();
  const entries = parseLog(rawText);
  const t1 = performance.now();
  const groups = groupErrors(entries);
  const t2 = performance.now();

  console.log(
    `Parsed ${entries.length} entries in ${(t1 - t0).toFixed(1)}ms, ` +
    `grouped into ${groups.length} clusters in ${(t2 - t1).toFixed(1)}ms`
  );

  currentGroups = groups;
  renderGroups(groups, currentTimezone);
}

// ---------------------------------------------------------------------------
// Input Mode 1: File Upload
// ---------------------------------------------------------------------------

function setupFileUpload() {
  const input = fileInput();
  const zone = dropZone();

  // File chosen via file picker
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;

    try {
      const text = await readFileAsText(file);
      processLog(text, `file "${file.name}"`);
    } catch (err) {
      alert(`Could not read file: ${err.message}`);
    }
  });

  // Drag-and-drop
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    zone.classList.remove('drag-over');
  });

  zone.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    zone.classList.remove('drag-over');

    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    try {
      const text = await readFileAsText(file);
      processLog(text, `drop "${file.name}"`);
    } catch (err) {
      alert(`Could not read file: ${err.message}`);
    }
  });
}

// ---------------------------------------------------------------------------
// Input Mode 2: Paste
// ---------------------------------------------------------------------------

function setupPaste() {
  const textarea = pasteTextarea();

  // Debounced: wait 400ms after the user stops typing before processing
  const debouncedProcess = debounce((text) => {
    processLog(text, 'paste');
  }, 400);

  textarea.addEventListener('input', () => {
    debouncedProcess(textarea.value);
  });
}

// ---------------------------------------------------------------------------
// Input Mode 3: URL Fetch
// ---------------------------------------------------------------------------

function setupUrlFetch() {
  const btn = urlFetchBtn();
  const input = urlInput();
  const status = urlStatus();
  const progress = document.getElementById('url-progress');
  const progressBar = document.getElementById('url-progress-bar');

  /**
   * Reset the URL status UI to idle state.
   */
  function resetStatus() {
    status.textContent = '';
    status.className = 'input-hint';
    if (progress) {
      progress.hidden = true;
      progress.removeAttribute('value');
    }
    if (progressBar) {
      progressBar.style.width = '0%';
    }
  }

  btn.addEventListener('click', async () => {
    const url = input.value.trim();
    if (!url) {
      status.textContent = 'Please enter a URL.';
      status.className = 'input-hint error';
      return;
    }

    // Cancel any in-flight fetch
    if (fetchAbortController) {
      fetchAbortController.abort();
    }
    fetchAbortController = new AbortController();

    // Show download-in-progress UI
    btn.disabled = true;
    btn.classList.add('loading');
    status.textContent = 'Connecting…';
    status.className = 'input-hint loading';
    if (progress) {
      progress.hidden = false;
      progress.value = 0;
    }
    if (progressBar) {
      progressBar.style.width = '0%';
    }

    try {
      // Phase 1: Download the URL as a local File (with progress)
      const file = await downloadAsFile(url, fetchAbortController.signal, (p) => {
        if (p.percent !== null) {
          status.textContent = `Downloading… ${p.percent}%`;
          if (progress) {
            progress.hidden = false;
            progress.value = p.percent;
          }
        } else {
          const loadedKB = (p.loaded / 1024).toFixed(0);
          status.textContent = `Downloading… ${loadedKB} KB`;
        }
        if (progressBar) {
          progressBar.style.width = (p.percent ?? 50) + '%';
        }
      });

      // Phase 2: Read the downloaded file locally (same path as file upload)
      const text = await readFileAsText(file);
      processLog(text, `URL "${url}"`);
      status.textContent = `Loaded ${(text.length / 1024).toFixed(1)} KB from "${file.name}" successfully.`;
      status.className = 'input-hint success';
      if (progress) {
        progress.hidden = true;
      }
      if (progressBar) {
        progressBar.style.width = '100%';
      }
    } catch (err) {
      resetStatus();
      if (err.name === 'AbortError') {
        status.textContent = 'Fetch cancelled.';
        status.className = 'input-hint';
      } else if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        // CORS or network error — fetch() gives very little detail, but this
        // is almost always a CORS block when the URL is otherwise reachable.
        status.textContent = 'Blocked by CORS policy. The remote server does not permit cross-origin requests. See the notice above for workarounds.';
        status.className = 'input-hint error';
      } else {
        status.textContent = `Error: ${err.message}`;
        status.className = 'input-hint error';
      }
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
      fetchAbortController = null;
    }
  });

  // Allow Enter key in the URL input to trigger fetch
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });
}

// ---------------------------------------------------------------------------
// Tab Switching
// ---------------------------------------------------------------------------

function setupTabs() {
  const tabBar = document.querySelector('.tab-bar');
  if (!tabBar) return;

  tabBar.addEventListener('click', (e) => {
    const btn = /** @type {HTMLElement} */ (e.target).closest('[data-tab]');
    if (!btn) return;

    const tabName = btn.dataset.tab;

    // Update active tab button
    for (const tab of tabBar.querySelectorAll('[data-tab]')) {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    }
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Show matching panel, hide others
    for (const panel of document.querySelectorAll('[data-panel]')) {
      if (panel.dataset.panel === tabName) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    }
  });

  // Keyboard navigation for tabs
  tabBar.addEventListener('keydown', (e) => {
    const current = document.activeElement;
    if (!current || !current.hasAttribute('data-tab')) return;

    const tabs = [...tabBar.querySelectorAll('[data-tab]')];
    const idx = tabs.indexOf(current);

    let nextIdx = -1;
    if (e.key === 'ArrowRight') {
      nextIdx = (idx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (idx - 1 + tabs.length) % tabs.length;
    }

    if (nextIdx >= 0) {
      e.preventDefault();
      /** @type {HTMLElement} */ (tabs[nextIdx]).focus();
      tabs[nextIdx].click();
    }
  });
}

// ---------------------------------------------------------------------------
// Timezone Selector
// ---------------------------------------------------------------------------

function setupTimezone() {
  const select = timezoneSelect();
  currentTimezone = buildTimezoneSelect(select);

  select.addEventListener('change', () => {
    currentTimezone = select.value;
    saveTimezone(currentTimezone);

    // Re-render with new timezone (timestamps change, groups don't)
    if (currentGroups.length > 0) {
      renderGroups(currentGroups, currentTimezone);
    }
  });
}

// ---------------------------------------------------------------------------
// Sort Headers
// ---------------------------------------------------------------------------

function setupSorting() {
  const table = document.getElementById('results-table');
  if (!table) return;

  table.addEventListener('click', (e) => {
    const th = /** @type {HTMLElement} */ (e.target).closest('th.sortable');
    if (!th) return;

    const column = th.dataset.sort;
    if (column) {
      setSort(column);
    }
  });

  // Keyboard: Enter/Space on sortable headers
  table.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const th = /** @type {HTMLElement} */ (e.target).closest('th.sortable');
      if (!th) return;
      e.preventDefault();
      const column = th.dataset.sort;
      if (column) {
        setSort(column);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Row Expand/Collapse (delegated)
// ---------------------------------------------------------------------------

function setupRowClicks() {
  const tbodyEl = tbody();

  tbodyEl.addEventListener('click', (e) => {
    const groupRow = /** @type {HTMLElement} */ (e.target).closest('.group-row');
    if (!groupRow) return;
    toggleExpand(groupRow);
  });

  // Keyboard: Enter/Space on group rows
  tbodyEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const groupRow = /** @type {HTMLElement} */ (e.target).closest('.group-row');
      if (!groupRow) return;
      e.preventDefault();
      toggleExpand(groupRow);
    }
  });
}

// ---------------------------------------------------------------------------
// Export & Clear Buttons
// ---------------------------------------------------------------------------

function setupActions() {
  // Export CSV
  exportBtn().addEventListener('click', async () => {
    try {
      await exportCSV();
      // Brief visual feedback
      const btn = exportBtn();
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Copied!';
      btn.classList.add('btn-success');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('btn-success');
      }, 2000);
    } catch (err) {
      alert(err.message || 'Export failed.');
    }
  });

  // Clear all
  clearBtn().addEventListener('click', () => {
    currentGroups = [];
    showEmptyState();

    // Clear inputs
    fileInput().value = '';
    pasteTextarea().value = '';
    urlInput().value = '';
    const status = urlStatus();
    status.textContent = '';
    status.className = 'input-hint';

    // Reset progress elements
    const progress = document.getElementById('url-progress');
    const progressBar = document.getElementById('url-progress-bar');
    if (progress) {
      progress.hidden = true;
      progress.removeAttribute('value');
    }
    if (progressBar) {
      progressBar.style.width = '0%';
    }

    // Abort any in-flight fetch
    if (fetchAbortController) {
      fetchAbortController.abort();
      fetchAbortController = null;
    }
  });
}

// ---------------------------------------------------------------------------
// Keyboard Shortcuts
// ---------------------------------------------------------------------------

function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+1/2/3 to switch tabs
    if (e.ctrlKey && e.shiftKey) {
      const tabBtns = document.querySelectorAll('[data-tab]');
      if (e.key === '1' && tabBtns[0]) tabBtns[0].click();
      if (e.key === '2' && tabBtns[1]) tabBtns[1].click();
      if (e.key === '3' && tabBtns[2]) tabBtns[2].click();
    }
  });
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

/**
 * Initialize the application. Called once on DOMContentLoaded.
 */
function init() {
  console.log('PHP Error Log Viewer — initializing…');

  setupTimezone();
  setupTabs();
  setupFileUpload();
  setupPaste();
  setupUrlFetch();
  setupSorting();
  setupRowClicks();
  setupActions();
  setupKeyboardShortcuts();

  // Initial empty state
  showEmptyState();

  // Expose for debugging
  if (typeof window !== 'undefined') {
    window.__phpErrorLogViewer = {
      processLog,
      getGroups: () => currentGroups,
      getTimezone: () => currentTimezone,
    };
  }

  console.log('PHP Error Log Viewer — ready.');
}

// --- Go ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
