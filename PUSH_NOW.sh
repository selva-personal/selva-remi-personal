#!/usr/bin/env bash
# Run this in Terminal — logs in as selva-personal and pushes full project
set -euo pipefail

cd "$(dirname "$0")"

echo "Step 1: Login to GitHub as selva-personal"
/usr/local/bin/gh auth login -h github.com -p https -w

echo "Step 2: Use gh credentials for git"
/usr/local/bin/gh auth setup-git

echo "Step 3: Push full project (replaces empty README on GitHub)"
git push -u origin main --force

echo ""
echo "Done! Repo: https://github.com/selva-personal/selva-remi-personal"
echo "Next: Netlify → Import from Git → selva-remi-personal"
