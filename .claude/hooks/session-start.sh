#!/bin/bash
# Prepares Claude Code cloud sessions: dependencies for typecheck/renders and a headless Chrome for Remotion.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

npm install --no-audit --no-fund

# Remotion downloads Chrome Headless Shell on first render, which the cloud proxy may block.
# Prefer the Playwright build that cloud containers ship with.
browser="$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | sort | tail -n 1 || true)"
if [ -n "$browser" ]; then
  if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
    echo "export REMOTION_BROWSER=\"$browser\"" >> "$CLAUDE_ENV_FILE"
  fi
else
  npx remotion browser ensure || echo "Aviso: não foi possível baixar o Chrome do Remotion; defina REMOTION_BROWSER." >&2
fi
