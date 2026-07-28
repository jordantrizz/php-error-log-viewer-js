# BUILD.md — PHP Error Log Viewer

## Quick Start

This is a **zero-dependency, pure client-side** application. No build step, no package manager, no bundler required.

```bash
# Clone and open
git clone <repo-url> php-error-log-viewer-js
cd php-error-log-viewer-js

# Serve locally (pick one)
python3 -m http.server 8080       # Python
npx serve .                       # Node (one-off, no install)
php -S localhost:8080             # PHP
```

Then open **http://localhost:8080** in your browser.

> A local server is only needed if you use ES modules (`import`/`export`). If you inline all JS into `index.html`, you can open the file directly with `file://`.

## Project Structure (implementation plan)

```
php-error-log-viewer-js/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js          # Entry point & event wiring
│   ├── parser.js       # Log line → ErrorEntry
│   ├── grouper.js      # ErrorEntry[] → ErrorGroup[]
│   ├── ui.js           # DOM rendering & interactivity
│   ├── timezone.js     # Timezone selector & date formatting
│   └── utils.js        # Escape, debounce, clipboard helpers
└── tests/
    └── fixtures/
        ├── sample-fatal.log
        ├── sample-warnings.log
        └── sample-mixed.log
```

## Implementation Order

### Phase 1 — Skeleton
1. Create `index.html` with the layout shell:
   - Header with title and timezone `<select>`
   - Three input tabs: Upload / Paste / URL
   - Stats bar (total errors, groups, time range)
   - Results table (`<table>` with `Count`, `Time`, `Message` columns)
   - Footer
2. Create `css/styles.css` with base styling and CSS custom properties for theming.

### Phase 2 — Parser (`js/parser.js`)
- Export `parseLog(rawText)` → `Array<ErrorEntry>`
- Regex patterns:
  - `\[(\d{2}-[A-Z][a-z]{2}-\d{4} \d{2}:\d{2}:\d{2}(?:\s+\S+)?)\]` for timestamp
  - `PHP (Fatal error|Warning|Notice|Parse error|Deprecated|Strict Standards):` for severity
  - `in (.+) on line (\d+)` for file/line extraction
  - `Stack trace:` and `#\d+` lines
- Handle malformed or unrecognized lines gracefully (return with `timestamp: null`).

### Phase 3 — Grouper (`js/grouper.js`)
- Export `groupErrors(entries)` → `Array<ErrorGroup>`
- Normalize function that:
  - Lowercases the message
  - Replaces numbers (including floats) with `<NUM>`
  - Replaces hex strings (`0x[0-9a-f]+`) with `<HEX>`
  - Replaces IP addresses with `<IP>`
  - Replaces file paths with `<FILE>`
  - Collapses whitespace
- Group by the fingerprint, aggregate counts and time ranges.
- Sort groups by count descending by default.

### Phase 4 — UI (`js/ui.js`)
- Export `renderGroups(groups, timezone)` — builds table rows
- Export `updateStats(totalErrors, totalGroups, timeRange)` — stats bar
- Export `showEmptyState()` / `hideEmptyState()` — when no data
- Row click → expand to show individual entries
- Column header click → sort ascending/descending
- Export button → copy CSV to clipboard

### Phase 5 — Timezone (`js/timezone.js`)
- Export `buildTimezoneSelect()` — populates `<select>` with IANA timezone names via `Intl.supportedValuesOf('timeZone')`
- Export `formatTimestamp(date, timezone)` → localized string
- Persist selection to `localStorage`

### Phase 6 — App Wiring (`js/app.js`)
- Import all modules, wire events:
  - File input `change` → `FileReader.readAsText()` → parse → group → render
  - Paste textarea `input` (debounced) → parse → group → render
  - URL input + "Fetch" button → `fetch()` → parse → group → render
  - Timezone `change` → re-render timestamps
  - Sort header clicks → re-sort and re-render
  - Export button → build CSV → `navigator.clipboard.writeText()`

## Browser Support

| Feature              | Chrome | Firefox | Safari | Edge |
|----------------------|--------|---------|--------|------|
| ES Modules           | 61+    | 60+     | 11+    | 16+  |
| `Intl.supportedValuesOf` | 87+ | 85+  | 15.4+  | 87+  |
| `navigator.clipboard`| 66+    | 63+     | 13.1+  | 79+  |
| CSS Grid             | 57+    | 52+     | 10.1+  | 16+  |

For older browsers without `Intl.supportedValuesOf`, provide a static fallback list of common IANA timezones.

## No Build / No Dependencies

This project intentionally avoids:

- **npm / package.json** — no dependencies to audit or update
- **Bundlers** (webpack, Vite, esbuild) — ES modules work natively
- **Frameworks** (React, Vue, Svelte) — DOM APIs are sufficient
- **CSS preprocessors** — CSS custom properties and nesting (where supported) are enough
- **Transpilation** — target modern browsers directly

## Deployment

Deploy to any static host:

```bash
# Netlify Drop — drag the folder onto netlify.com
# GitHub Pages — push to gh-pages branch
# Vercel — vercel .
# Any static file server (nginx, Apache, S3 + CloudFront)
```

No environment variables, no secrets, no server-side code.

## Docker

A `Dockerfile` and `docker-compose.yml.example` are included for containerized serving.

```bash
# Build and start with Docker Compose
docker compose -f docker-compose.yml.example up --build

# Or build and run manually
docker build -t php-error-log-viewer .
docker run -d -p 8080:80 php-error-log-viewer
```

Then open **http://localhost:8080**.

To use a different host port:

```bash
HOST_PORT=3000 docker compose -f docker-compose.yml.example up
```

The image uses `nginx:alpine` (~5 MB base) and serves the static files with gzip compression enabled. No build step or dependencies required — just copy and serve, consistent with the project's zero-dependency philosophy.

## Development Workflow

1. Edit files directly
2. Refresh browser
3. Use browser DevTools for debugging

That's it. For a better DX, use VS Code Live Server or similar for auto-reload.
