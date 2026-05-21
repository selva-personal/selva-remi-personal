# selva-remi-personal 💕

Romantic birthday surprise for **Remi** — React, Tailwind CSS, Framer Motion (Tamil + 13 years of love).

**GitHub:** https://github.com/selva-personal/selva-remi-personal  
**Netlify:** _(deploy after connecting repo — see [DEPLOY.md](./DEPLOY.md))_

## Quick Start

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

## Customize For Your Girlfriend

Edit **`src/data/content.ts`**:

| Setting | What to change |
|--------|----------------|
| `CONFIG.firstMetDate` | Date you first met (countdown timer) |
| `CONFIG.herName` | Her name |
| `TYPEWRITER_MESSAGE` | Your personal birthday letter |
| `GALLERY_PHOTOS` | Replace `src` with your photos (`/photos/1.jpg` in `public/photos/`) |
| `MEMORIES` | Your relationship timeline |
| `REASONS_I_LOVE_YOU` | Your personal reasons |
| `OPEN_WHEN_LETTERS` | Your "Open When..." messages |
| `SECRET_MESSAGE` | Hidden message (tap 3× on the secret button) |
| `FINAL_MESSAGE` | Closing emotional message |

### Background Music

1. Add your romantic song as `public/music/romantic.mp3`
2. Or change `CONFIG.musicSrc` in `content.ts`

Browsers block autoplay until the user interacts — the music player appears after opening the surprise.

### Photos

1. Create `public/photos/` and add your images
2. Update `GALLERY_PHOTOS` in `content.ts`:

```ts
{ id: 1, src: "/photos/us-1.jpg", caption: "Our first date", alt: "..." }
```

## Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- canvas-confetti

Made with love ❤️
