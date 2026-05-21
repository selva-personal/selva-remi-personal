# Deploy Guide — selva-remi-personal

## Stack
- **Framework:** React 19 + Vite 8
- **Build:** `npm run build`
- **Publish:** `dist/`

## 1. GitHub (one-time auth)

```bash
/usr/local/bin/gh auth login
```

Choose: GitHub.com → HTTPS → Login with browser

Then create repo and push:

```bash
cd /Users/macos/Desktop/surp
/usr/local/bin/gh repo create selva-remi-personal --public --source=. --remote=origin --push
```

If the repo already exists on GitHub:

```bash
git remote add origin https://github.com/selva-personal/selva-remi-personal.git
git push -u origin main
```

**Repo URL:** https://github.com/selva-personal/selva-remi-personal

## 2. Netlify (one-time auth)

```bash
netlify login
```

## 3. Connect GitHub → Netlify (recommended)

1. Open https://app.netlify.com/teams/selvakumarbcask72000/projects
2. **Add new site** → **Import an existing project** → **GitHub**
3. Select repo: `selva-personal/selva-remi-personal`
4. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy site

## 4. Or deploy via CLI

```bash
cd /Users/macos/Desktop/surp
netlify init
netlify deploy --prod --build
```

## Environment variables

No secrets required for build. Optional: copy `.env.example` to `.env.local` (gitignored).
