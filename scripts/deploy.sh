#!/usr/bin/env bash
# Run after: gh auth login && netlify login
set -euo pipefail

GH="/usr/local/bin/gh"
REPO="selva-personal/selva-remi-personal"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"

echo "==> Verify build"
npm run build

echo "==> GitHub: create repo (if missing) and push"
if ! "$GH" repo view "$REPO" &>/dev/null; then
  "$GH" repo create selva-remi-personal --public --description "Romantic birthday surprise for Remi — React + Vite"
fi

git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${REPO}.git"
git push -u origin main

echo "==> Netlify: production deploy"
netlify link --name selva-remi-personal 2>/dev/null || netlify init
netlify deploy --prod --build

echo "==> Done"
echo "GitHub: https://github.com/${REPO}"
netlify status
