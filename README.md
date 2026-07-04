# William Naing — Portfolio

A personal site for **William Naing**, a Melbourne-based business development
manager, founder's associate, and AI product builder. Built as a static site and
deployed to GitHub Pages.

**Live:** https://williamturbo.github.io/

## Design

- **Two switchable themes** — a dark charcoal + indigo default and a warm cream
  light mode (choice remembered in `localStorage`). Colour, type, spacing and
  motion are OKLCH design tokens.
- Typefaces: **Space Grotesk** (oversized display) + **JetBrains Mono**
  (micro-labels) + **Inter** (body) — all self-hosted.
- Stat-led editorial structure: numbered capability list, problem→outcome case
  studies, a tool stack, and a dark closing contact band.

## Interaction

- **Light / dark theme toggle** in the nav (remembers your choice; dark by default).
- Smooth inertia scrolling (Lenis) with scroll-triggered reveals.
- Rotating "open to work" badge, animated stat counters, and an auto-scrolling
  tools marquee; arrow-affordance links that slide on hover.
- Sticky navigation with a full-width mobile menu.
- Fully accessible: honours `prefers-reduced-motion`, visible focus states,
  semantic HTML and keyboard support, and degrades gracefully without JavaScript.

## Structure

```
index.html     # markup (single page)
fonts.css      # self-hosted @font-face — no third-party requests
tokens.css     # OKLCH design tokens (light + dark themes)
styles.css     # editorial design system + sections
main.js        # theme toggle, reveals, counters, Lenis, nav (vanilla JS)
assets/        # headshot, favicon, OG image, fonts/, icons/, vendor/ (Lenis)
```

## Notes

- Copy is drawn from William's CV — positioned as an adaptable BD manager /
  founder's associate / AI product builder.
- Everything is self-hosted; there are no third-party requests or CDN scripts.
- Personal data is intentionally limited to name, city, email, and LinkedIn —
  phone number, full address, and legal name are deliberately omitted.
- Design system built with the Hallmark anti-slop discipline (OKLCH tokens, structural variety).
