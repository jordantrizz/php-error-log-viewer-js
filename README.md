# PHP Error Log Viewer

A **client-side only** JavaScript browser application that loads, parses, and visualizes PHP error logs. Upload a file, paste content, or fetch from a URL — errors are intelligently grouped by similarity and displayed in a sortable, timezone-aware table.

**Zero dependencies. Zero build step. Nothing leaves your browser.**

## Features

- 🔒 **100% client-side** — parsing happens in your browser, no data ever sent to a server
- 📂 **Three input modes** — file upload (drag & drop), copy/paste textarea, remote URL fetch
- 🧠 **Smart grouping** — similar errors are clustered together by normalized fingerprint
- 🕐 **Timezone selector** — all timestamps shown in your chosen IANA timezone, persisted across sessions
- 🔽 **Sortable columns** — click `Count`, `Time`, or `Message` headers to reorder
- 📋 **Expand/collapse** — click a group row to see individual occurrences with full stack traces
- 📊 **Stats bar** — total errors, unique groups, time range at a glance
- 📤 **CSV export** — copy grouped results to clipboard
- 🌓 **Dark mode** — respects your system preference automatically
- 📱 **Responsive** — works on desktop and mobile

## Quick Start

```bash
./serve.sh          # Starts on port 8080
./serve.sh 3000     # Custom port
```

Then open **http://localhost:8080** in your browser.

The script auto-detects Python 3, Python 2, PHP, or `npx serve` — whichever you have available.

Or manually:

```bash
python3 -m http.server 8080
```

## Supported Log Formats

Recognizes common PHP error log patterns:

```
[dd-Mmm-yyyy HH:MM:SS TZ] PHP Fatal error:  message in /path/file.php on line 42
[dd-Mmm-yyyy HH:MM:SS TZ] PHP Warning:  message
PHP Notice:  message in /path/file.php:42
Stack trace:
#0 /path/file.php(123): Class->method()
  thrown in /path/file.php on line 42
```

Severity levels detected: **Fatal**, **Parse**, **Warning**, **Notice**, **Deprecated**, **Strict**, **Catchable Fatal**, and user-level variants.

## Architecture

```
php-error-log-viewer-js/
├── index.html              # Entry point — layout, tabs, table
├── css/
│   └── styles.css          # All styling (dark/light, responsive)
├── js/
│   ├── app.js              # Bootstrap & event wiring
│   ├── parser.js           # Regex-based log → ErrorEntry
│   ├── grouper.js          # Normalize & cluster → ErrorGroup
│   ├── ui.js               # DOM rendering, sort, expand, export
│   ├── timezone.js         # IANA timezone picker & formatting
│   └── utils.js            # Debounce, escape, fetch helpers
├── tests/
│   └── fixtures/            # Sample PHP error logs
├── serve.sh                # Dev server launcher
└── README.md
```

### Data Flow

```
Input (file / paste / URL)
  → raw text
  → parser.js  →  Array<ErrorEntry>
  → grouper.js →  Array<ErrorGroup>
  → ui.js      →  HTML table
```

## Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 87+    | 85+     | 15.4+  | 87+  |

## Design Principles

- **Zero dependencies** — plain ES modules, no npm, no framework, no build step
- **Progressive enhancement** — semantic HTML, ARIA labels, keyboard navigable
- **Privacy-first** — no analytics, no telemetry, no data leaves your machine
- **Accessible** — screen-reader friendly with proper roles and live regions

## Deployment

Deploy to any static host — no server-side code, no environment variables, no secrets:

```bash
# Netlify Drop — drag the folder onto netlify.com
# GitHub Pages — push to gh-pages branch
# Vercel — vercel .
# Any static file server (nginx, Apache, S3)
```

## License

MIT
