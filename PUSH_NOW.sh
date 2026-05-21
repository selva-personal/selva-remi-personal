#!/usr/bin/env bash
# Push to selva-personal/selva-remi-personal (uses real GitHub CLI, not npm "gh")
set -euo pipefail

cd "$(dirname "$0")"

GH="/usr/local/bin/gh"
if [[ ! -x "$GH" ]]; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

# npm's broken "gh" package shadows the real CLI — use Homebrew gh only
export PATH="/usr/local/bin:$(echo "$PATH" | tr ':' '\n' | grep -v 'node.*bin' | tr '\n' ':' | sed 's/:$//')"

echo "Step 1: Login to GitHub as selva-personal (browser will open)"
"$GH" auth login -h github.com -p https -w

echo "Step 2: Configure git to use GitHub CLI credentials"
"$GH" auth setup-git

echo "Step 3: Push project to GitHub"
git push -u origin main

echo ""
echo "Done! https://github.com/selva-personal/selva-remi-personal"
echo "Next: Netlify → Import from Git → selva-remi-personal"
