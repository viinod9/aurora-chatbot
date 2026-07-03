#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-aurora-chatbot}"
GH="${GH:-gh}"
export GH_CONFIG_DIR="${GH_CONFIG_DIR:-$HOME/.gh-config}"
mkdir -p "$GH_CONFIG_DIR"

if ! command -v "$GH" &>/dev/null; then
  echo "GitHub CLI (gh) is required. Install: brew install gh"
  exit 1
fi

if ! "$GH" auth status &>/dev/null; then
  echo "Not logged in to GitHub."
  echo "Run: GH_CONFIG_DIR=\"\$HOME/.gh-config\" gh auth login"
  exit 1
fi

USERNAME=$("$GH" api user -q .login)
REMOTE="https://github.com/${USERNAME}/${REPO_NAME}.git"

echo "Creating public repository: ${USERNAME}/${REPO_NAME}"
"$GH" repo create "$REPO_NAME" --public --source=. --remote=origin --push --description "Aurora Chat — beautiful React chatbot with glassmorphism UI"

echo "Enabling GitHub Pages (GitHub Actions source)..."
"$GH" api "repos/${USERNAME}/${REPO_NAME}/pages" \
  -X POST \
  -f build_type=workflow \
  2>/dev/null || echo "Pages may already be configured — check Settings → Pages."

LIVE_URL="https://${USERNAME}.github.io/${REPO_NAME}/"
echo ""
echo "Done! Repository: https://github.com/${USERNAME}/${REPO_NAME}"
echo "Live site (after workflow completes, ~1-2 min): ${LIVE_URL}"
echo ""
echo "Update README live demo link:"
echo "  ${LIVE_URL}"
