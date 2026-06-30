# William Naing — personal site

A fast, dependency-free personal website for William Naing — AI &amp; automation
consultant and business-development strategist based in Melbourne.

Pure **HTML + CSS + vanilla JS**. No framework, no build step. Hosted on **GitHub Pages**.

## Structure
```
index.html   # all page markup (single page)
styles.css   # design system + layout
main.js      # mobile nav, scroll reveals, sticky nav
assets/      # favicon, portrait, (CV PDF, logos)
```

## Local preview
Open `index.html` directly in a browser, or run a tiny local server:
```bash
python -m http.server 5500
# then visit http://localhost:5500
```

## Editing content
- Copy lives directly in `index.html`.
- The headshot is `assets/william.jpg` (used in the hero). Replace that file to swap the photo.
- LinkedIn and email are plain links in the Contact section of `index.html`.

## Deploy (GitHub Pages)
Push to `main`, then enable **Settings → Pages → Deploy from branch → main / root**.

> ⚠️ Content note: client names are intentionally omitted/anonymised. Confirm permission
> before naming any client publicly.
