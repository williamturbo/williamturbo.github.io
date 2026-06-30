# William Naing — Portfolio

An image-forward personal site for **William Naing**, a Melbourne-based operator
and builder working across business development, operations, and AI automation.
Built as a static site and deployed to GitHub Pages.

**Live:** https://williamturbo.github.io/

## Design

- Modern, image-forward editorial direction on a dark, high-contrast canvas.
- Typefaces: **Space Grotesk** (display) + **Inter** (body).
- Warm off-white palette with a single electric-blue accent and a dark feature hero.

## Interaction

- Scroll-triggered reveals (IntersectionObserver) with a subtle staggered cascade.
- Image-forward hero with portrait, stats band, and an auto-scrolling tools marquee.
- Sticky navigation that gains a border on scroll, plus a full-width mobile menu.
- Fully accessible: honours `prefers-reduced-motion`, visible focus states,
  semantic HTML and keyboard support, and degrades gracefully without JavaScript.

## Structure

```
index.html     # markup (single page)
styles.css     # design system + sections
main.js        # scroll reveals, sticky nav, mobile menu (vanilla JS, no dependencies)
assets/        # headshot + favicon
```

## Notes

- Copy is drawn from William's CV — positioned as an operator & builder who runs lean with AI.
- Fonts load from Google Fonts; everything else is self-contained (no JS libraries, no CDN scripts).
- Personal data is intentionally limited to name, city, email, and LinkedIn —
  phone number, full address, and legal name are deliberately omitted.
