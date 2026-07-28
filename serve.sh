#!/usr/bin/env bash
# serve.sh — Start a local dev server for PHP Error Log Viewer
#
# Usage:
#   ./serve.sh          # Default port 8080
#   ./serve.sh 3000     # Custom port
#
# Requires Python 3 (preferred) or Python 2, or PHP, or npx as fallback.

set -euo pipefail

PORT="${1:-8080}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR"

echo "==================================="
echo " PHP Error Log Viewer — Dev Server"
echo "==================================="
echo ""

# Try Python 3 first
if command -v python3 &>/dev/null; then
  echo "✓ Using Python 3 http.server"
  echo "  Open: http://localhost:${PORT}"
  echo "  Press Ctrl+C to stop."
  echo ""
  python3 -m http.server "$PORT"

# Fall back to Python 2
elif command -v python &>/dev/null && python -c 'import SimpleHTTPServer' 2>/dev/null; then
  echo "✓ Using Python 2 SimpleHTTPServer"
  echo "  Open: http://localhost:${PORT}"
  echo "  Press Ctrl+C to stop."
  echo ""
  python -m SimpleHTTPServer "$PORT"

# Fall back to PHP built-in server
elif command -v php &>/dev/null; then
  echo "✓ Using PHP built-in server"
  echo "  Open: http://localhost:${PORT}"
  echo "  Press Ctrl+C to stop."
  echo ""
  php -S "localhost:${PORT}"

# Fall back to npx serve
elif command -v npx &>/dev/null; then
  echo "✓ Using npx serve (one-time download if needed)"
  echo "  Open: http://localhost:${PORT}"
  echo "  Press Ctrl+C to stop."
  echo ""
  npx serve . -l "$PORT"

else
  echo "✗ No HTTP server found."
  echo "  Install one of: Python 3, PHP, or Node.js"
  exit 1
fi
