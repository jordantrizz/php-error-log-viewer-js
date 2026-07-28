# AGENTS.md

## Development Workflow

* Don't create test files such as bash scripts or php scripts in the main codebase.
* **Auto-commit and push after every change.** After completing any code changes (fixes, features, refactors, etc.), automatically create a git commit with a descriptive message using conventional commit format (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`). Do not wait for the user to ask — commit immediately after the changes are verified. Print the commit message when finishing the work.
* **Commit after each PGF phase.** When executing a Plan Generation File (PGF), commit after completing each phase (including its validation) before moving to the next phase. This ensures incremental progress and easier debugging. Use `git add -A && git commit -m "feat: <phase description>" && git push` after phase validation passes.
* Search `doc/` folder before creating new documentation files to avoid duplicates.
* After completing code work, suggest testing methods for the change to complete.
* Backend buttons, forms, and AJAX actions that trigger queue-backed work should queue the task immediately, kick off background processing, and return the task ID with a Task Queue link instead of blocking the request while the task completes.
* Only explicit queue-runner controls, such as a dedicated "Process Queue Now" action or task queue testing control, should call `process_task()` or `process_queued_tasks()` directly in the request.
* When adding new admin UI or AJAX task submissions, prefer `Faithmade_Task_Queue::submit_task()` over open-coded `create_task()` plus follow-up processing logic, unless the flow explicitly needs queue-only behavior.
* Use `submit_task(..., true)` for new admin UI actions that should start immediately, and use `create_task()` only when the flow intentionally needs `Running/Queued` state until cron or another queue runner picks it up.


## Project Overview

A **client-side only** JavaScript browser application that loads, parses, and visualizes PHP error logs. Users can supply logs via file upload, copy/paste, or a remote URL. Errors are intelligently grouped by similarity, and displayed in a sortable table with timezone-aware timestamps.

## Architecture

```
php-error-log-viewer-js/
├── index.html              # Entry point — layout shell, loaders, table
├── css/
│   └── styles.css          # All styling (modern, responsive, dark/light)
├── js/
│   ├── app.js              # Bootstrap, event wiring, top-level orchestrator
│   ├── parser.js           # Regex-based log-line → structured error object
│   ├── grouper.js          # Similarity clustering (normalize → group)
│   ├── ui.js               # DOM rendering: table rows, stats, empty states
│   ├── timezone.js         # Timezone list builder + date formatting
│   └── utils.js            # Shared helpers (debounce, escape, etc.)
└── tests/                  # (future) unit tests
```

## Data Flow

```
Input (file / paste / URL)
  → raw text string
  → parser.js  →  Array<ErrorEntry>
  → grouper.js →  Array<ErrorGroup>
  → ui.js      →  HTML table rendered into DOM
```

## Core Data Structures

### ErrorEntry (single parsed log line)

| Field       | Type     | Description                              |
|-------------|----------|------------------------------------------|
| `raw`       | `string` | Original log line                        |
| `timestamp` | `Date`   | Parsed datetime (or null if unparseable) |
| `message`   | `string` | Normalized error message                 |
| `severity`  | `string` | e.g. `Fatal`, `Warning`, `Notice`        |
| `file`      | `string` | Source file path (if present)            |
| `line`      | `number` | Source line number (if present)          |

### ErrorGroup (aggregated similar errors)

| Field         | Type              | Description                                 |
|---------------|-------------------|---------------------------------------------|
| `key`         | `string`          | Fingerprint used for dedup                  |
| `count`       | `number`          | Number of occurrences                       |
| `firstSeen`   | `Date`            | Earliest timestamp in group                 |
| `lastSeen`    | `Date`            | Latest timestamp in group                   |
| `message`     | `string`          | Representative message                      |
| `entries`     | `Array<ErrorEntry>`| All raw entries in this group              |

## Grouping Strategy

1. Normalize each message by:
   - Lowercasing
   - Replacing numbers, UUIDs, hex strings, IPs with placeholders (`<NUM>`, `<HEX>`, `<IP>`)
   - Stripping file paths (or normalizing them)
2. The resulting normalized string becomes the group `key`.
3. Entries with the same `key` are folded into one `ErrorGroup`.

## Features

- **Three input modes**: file picker, textarea paste, URL fetch (with CORS proxy note)
- **Timezone selector**: populated from `Intl.supportedValuesOf('timeZone')`; defaults to local
- **Sortable columns**: click `Count`, `Time`, or `Message` headers to sort
- **Expand/collapse groups**: click a row to see individual occurrences
- **Export**: copy grouped summary as CSV/TSV
- **Stats bar**: total errors, total groups, time range

## Design Principles

- **Zero dependencies** — plain ES modules, no framework, no build step
- **Progressive enhancement** — works without JS modules (script nomodule fallback not required but nice)
- **Accessible** — semantic HTML, ARIA labels, keyboard navigable
- **Responsive** — usable on mobile viewports
- **Privacy-first** — no data leaves the browser; no analytics, no telemetry

## PHP Log Format Support

Recognizes common PHP error log formats:

```
[dd-Mmm-yyyy HH:MM:SS TZ] message in /path/file.php:line
[dd-Mmm-yyyy HH:MM:SS TZ] message
PHP message: message in /path/file.php:line
Stack trace lines (indented, start with #)
```

Parsing is best-effort; unrecognized lines are shown as-is with a `null` timestamp.

## Testing Strategy

- Manual testing matrix: Chrome, Firefox, Safari, Edge
- Test fixtures: sample PHP error logs in `tests/fixtures/`
- Future: Vitest or Jest for unit tests on parser and grouper

## Conventions

- JavaScript: ES2020+, strict mode, `const`/`let` only, `async/await`
- CSS: Custom properties for theming, Flexbox/Grid for layout
- HTML: Single `index.html`, no framework, semantic elements
- Naming: camelCase for JS, kebab-case for CSS classes and files
- Comments: JSDoc on public functions; inline for non-obvious logic
