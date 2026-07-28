/**
 * utils.js — Shared Helper Utilities
 *
 * Small, reusable functions used across the application.
 * No external dependencies.
 *
 * @module utils
 */

// ---------------------------------------------------------------------------
// HTML Escaping
// ---------------------------------------------------------------------------

/**
 * Escape HTML special characters to prevent XSS when inserting user-provided
 * text into the DOM via innerHTML.
 *
 * Characters escaped: & < > " '
 *
 * @param {string} str - Raw string that may contain HTML metacharacters
 * @returns {string} Safe HTML-escaped string
 */
export function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Debounce
// ---------------------------------------------------------------------------

/**
 * Create a debounced version of a function that delays invocation until
 * `delayMs` milliseconds have elapsed since the last call.
 *
 * Useful for expensive operations triggered by rapid user input (e.g.,
 * parsing/re-rendering on every keystroke in a textarea).
 *
 * @template T
 * @param {(...args: any[]) => T} fn - The function to debounce
 * @param {number} delayMs - Debounce delay in milliseconds
 * @returns {(...args: any[]) => void}
 */
export function debounce(fn, delayMs) {
  let timeoutId = null;

  return function debounced(...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, delayMs);
  };
}

// ---------------------------------------------------------------------------
// File Reading
// ---------------------------------------------------------------------------

/**
 * Read a File object as text using FileReader.
 *
 * @param {File} file - The file to read
 * @returns {Promise<string>} The file's text content
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(/** @type {string} */ (reader.result));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// ---------------------------------------------------------------------------
// URL Fetching
// ---------------------------------------------------------------------------

/**
 * Fetch text content from a remote URL.
 *
 * Note: Due to CORS restrictions, fetching remote logs may fail unless the
 * server sends appropriate `Access-Control-Allow-Origin` headers or the
 * log is served from the same origin.
 *
 * @param {string} url - The URL to fetch
 * @param {AbortSignal} [signal] - Optional AbortSignal for cancellation
 * @returns {Promise<string>} The fetched text content
 */
export async function fetchLogUrl(url, signal) {
  // Basic URL validation
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Invalid URL. Please enter a full URL (e.g., https://example.com/error.log).');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are supported.');
  }

  const response = await fetch(url, {
    signal,
    headers: {
      'Accept': 'text/plain, text/*, */*',
    },
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();

  // Warn (but don't block) if content looks like HTML rather than a log
  if (contentType.includes('text/html') || text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    console.warn('Fetched URL returned HTML content — trying to parse anyway.');
  }

  return text;
}

// ---------------------------------------------------------------------------
// DOM Helpers
// ---------------------------------------------------------------------------

/**
 * Safely query an element by selector and throw if it's missing.
 * Useful for asserting that critical DOM elements exist at startup.
 *
 * @template {HTMLElement} T
 * @param {string} selector - CSS selector
 * @param {new () => T} [type] - Expected element constructor (optional)
 * @returns {T}
 */
export function $(selector, type) {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`Required element not found: "${selector}"`);
  }
  return /** @type {T} */ (el);
}

/**
 * Safely query all elements matching a selector.
 *
 * @template {HTMLElement} T
 * @param {string} selector
 * @returns {NodeListOf<T>}
 */
export function $$(selector) {
  return document.querySelectorAll(selector);
}
