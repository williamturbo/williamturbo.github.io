# Animation & Design Library Research — Portfolio Redesign

**Date:** July 2026 · **Scope:** 9 libraries/tools evaluated for a hand-rolled, no-build-step static site on GitHub Pages
**Method:** multi-agent research harness — 5 search angles, 23 sources fetched, 113 claims extracted, top 25 adversarially verified (3-vote). GSAP and StringTune claims verified 3–0; remaining niche-tool claims are single-source from official sites/repos (noted below). Anime.js and StringTune licensing were additionally verified directly against the npm registry.

---

## TL;DR — Recommended stack

| Layer | Pick | Why |
|---|---|---|
| Motion engine | **GSAP 3.13+** (core + ScrollTrigger + SplitText) via CDN | Now 100% free incl. all former Club plugins; the canonical Awwwards-portfolio tool; vanilla-JS-first |
| Decorative assets | **Haikei** | Free browser tool; exports static SVG/PNG; zero runtime cost |
| Optional 3D hero | **Three.js** via ES import maps | MIT, ~168 kB gz; only if one signature WebGL moment is wanted |
| Lightweight alternative | **Anime.js v4** | MIT, ~7 kB gz; if GSAP feels heavy — has scroll, text-split, draggable, springs |
| Skip | motion-primitives, SkiperUI, Vengeance UI | React/Tailwind/shadcn-only — incompatible with this site's no-build vanilla setup |
| Skip (or inspiration only) | Animmaster Lib | Paid copy-paste component pack, not a library; solo-creator trust caveats |
| Maybe later | StringTune | Vanilla-first and MIT, genuinely interesting — but young (v1.0 Jan 2025) and redundant next to GSAP |

**Design direction:** keep the editorial identity the site already has, add a motion layer — scroll-driven reveals (SplitText + ScrollTrigger), one signature interactive moment, editorial display typography, `prefers-reduced-motion` respected throughout.

---

## Per-library findings

### 1. GSAP (GreenSock) — ✅ use it · *all claims verified 3–0*

- **Licensing (the big 2025 change):** Webflow acquired GreenSock in fall 2024. As of **GSAP 3.13 (April 29, 2025), GSAP and every formerly-paid Club plugin — SplitText, MorphSVG, ScrollSmoother, DrawSVG, ScrambleText, Inertia, Physics2D, Flip, etc. — are 100% free, including for commercial use**. Club memberships are discontinued. ([webflow.com](https://webflow.com/updates/gsap-becomes-free), [gsap.com/blog/3-13](https://gsap.com/blog/3-13/), [gsap.com/pricing](https://gsap.com/pricing/))
- **License nuance:** it is *free-of-charge proprietary*, not open source — a "Standard No Charge GSAP License" where IP stays with Webflow. Permitted Uses cover any website/app by any person or entity; the only substantive prohibition is building no-code animation tools that compete with Webflow. Zero practical risk for a portfolio. ([standard-license](https://gsap.com/community/standard-license/), [ScanCode LicenseDB](https://scancode-licensedb.aboutcode.org/gsap-standard-no-charge-2025.html))
- **Vanilla fit:** excellent — all plugins are on the public GitHub/npm and CDN-loadable via plain `<script>` tags; no build step, no token. GSAP predates modern frameworks and is framework-agnostic.
- **Size:** core ~60 kB min / ~25 kB gz; core + ScrollTrigger ~85 kB / ~34 kB (gsapvault.com blog figures — indicative, not primary).
- **Signature effects:** ScrollTrigger pin/scrub/snap scroll storytelling, SplitText line/word/char reveals (rewritten in 3.13: 50 % smaller, built-in screen-reader accessibility, `autoSplit` responsive re-splitting, mask reveals), DrawSVG line-drawing, MorphSVG shape morphs, Physics2D (e.g. Codrops' shattering-headline demo), Flip layout transitions.
- **Learning curve:** moderate; the best-documented animation library on the web, with huge community. Codrops published 13 GSAP-focused tutorials in 2025 alone.

### 2. Anime.js v4 — ✅ solid lightweight alternative · *verified via npm registry*

- **v4.5.0, MIT license**, vanilla-JS animation engine by Julian Garnier. Ships a UMD bundle (`anime.umd.min.js`) wired to unpkg/jsDelivr — **CDN-friendly, no build step**.
- Modular: timer, animation, timeline, animatable, **draggable**, scope, **scroll (ScrollObserver/onScroll)**, spring easings, **text splitting**, SVG, WAAPI adapters.
- ~17 kB min / ~7 kB gz (blog figure) — roughly a quarter of GSAP core.
- ⚠️ A GSAP-fan comparison blog claimed v4 "has no scroll integration" — **refuted**: the package's own module list includes scroll; v4 shipped ScrollObserver.
- Verdict: if you want one small MIT library instead of GSAP, this is the pick. But GSAP's plugin depth (SplitText masking, MorphSVG, pinning) is stronger for Awwwards-style work, and both are free now.

### 3. Three.js — ✅ optional, for one signature 3D moment · *multi-source, unverified votes*

- **MIT, free**; the dominant engine for creative/brand WebGL sites; ~168 kB gz vs Babylon's ~1.4 MB; 5 M+ weekly npm downloads.
- **Steepest learning curve** of anything here — low-level, requires real 3D concepts (scenes, cameras, materials, render loop).
- **No-build caveat:** a 2022 three.js forum thread documents CDN-only pain (Skypack path breakage, version-mixing between core and `examples/jsm` addons). This is largely historical — **ES import maps are baseline in all major browsers since 2023**, and `<script type="importmap">` + jsDelivr works fine today — but pin one version for core *and* addons.
- Recommendation: only add it for a single hero-level moment (shader background, 3D object). Codrops' 2025 year-in-review names 3D/WebGL/shaders the dominant creative-dev theme, but a bad Three.js scene hurts more than no Three.js.

### 4. StringTune (@fiddle-digital/string-tune) — 🟡 interesting, not essential · *effects list verified 3–0; license verified via npm*

- Real library from the **Fiddle.Digital** design agency (Codrops feature, March 2025). **MIT, zero runtime dependencies** (confirmed against registry, v1.2.1 published 2026-07-16 — actively maintained, 141 releases).
- **Vanilla-first by design:** declarative HTML-attribute API (`string="parallax"` etc.), loadable from unpkg; 18 modules — smooth/lerp scrolling, parallax, scroll progress, **magnetic cursor**, custom reactive cursor, split-text, autoplay video; can pipe scroll/mouse values into a Three.js scene.
- Caveats: young (first npm publish Jan 2025), small community, self-reported performance claims, and it overlaps heavily with what GSAP + a few lines of CSS give you. Fine to experiment with; risky as the backbone.

### 5. motion-primitives — ❌ not usable here · *single-source (official repo/docs)*

- Open-source (MIT, free) **React component kit** by ibelick, built on Motion (ex-Framer Motion) + Tailwind, distributed as copy-paste TSX. Explicitly in beta. Every component requires the Motion React library; plain-CSS versions are "future plans."
- **Requires React/Next + build step → incompatible** with this site. Worth browsing as an interaction-pattern moodboard only.

### 6. Haikei (haikei.app) — ✅ use for assets · *single-source (official site)*

- Not a library — a **free browser-based generator** (no signup) for SVG/PNG backgrounds: layered waves, blobs, low-poly, steps, symbols, gradients.
- Output is a static file you drop into the repo — **zero runtime, zero build, perfect for GitHub Pages**. Good for section dividers and OG-image backgrounds that match the token palette.

### 7. "Animmaster Lib" (animmasterlib.dev) — ⚠️ not a library; inspiration pack at best · *single-source (its own site)*

- It's a **one-time-purchase zip of ~300 pre-built animated components** (Junior $3 / PRO $10 / Premium $20 list, frequently discounted), not an npm package. Site claims 60 % plain HTML/CSS/JS, 30 % React, 10 % Next — so most snippets *would* run on a static site.
- Categories: 63 scroll animations, 22 3D, 18 WebGL shaders, 20 mouse effects, 17 page transitions, 14 text animations.
- Caveats: solo-creator product marketed via Instagram/Telegram; the site pre-emptively answers "is this a scam" on its own FAQ; unknown code quality/licensing rigor. Using stock components also cuts against the "stand out" goal.

### 8. SkiperUI (skiper-ui.com) — ❌ not usable here · *single-source (official docs)*

- **shadcn-registry component kit: React + Tailwind + Framer Motion (+ GSAP) prerequisites, TSX modules, CLI install** — build step required. Freemium: Pro components need a paid membership (license key via Polar).
- Author openly notes most components are reverse-engineered recreations of effects seen on award sites — fine as a *catalog of effects to hand-build in vanilla JS*, which is genuinely useful; not installable here.

### 9. "Vengence UI" (vengenceui.com) — ❌ not usable here · *single-source (site + GitHub)*

- Identity confirmed: real project, domain spelled **Vengence**, branded **Vengeance UI** — "Animated React Components," ~46 components / 9 families, distributed via the shadcn registry (`npx shadcn@latest add @vengeanceui/…`).
- **React/TypeScript/Tailwind/Framer Motion/Next only** → incompatible. Additional red flags for a professional dependency: **no license file on the GitHub repo** (legally ambiguous reuse) and a Solana pump.fun token address in the site footer.

---

## What makes portfolios stand out (2025–26 evidence)

- **Awwwards portfolio winners' tech filter:** GSAP, Three.js, WebGL, Barba.js, Lottie — and plain "Javascript" is its own winning category alongside React/Next. Vanilla sites win at the highest level (e.g. a June 2026 SOTD personal portfolio).
- **Awwwards design-attribute taxonomy** is dominated by motion- and scroll-centric tags: Parallax, Infinite Scroll, Horizontal Layout, Microinteractions, Storytelling, Transitions, Typography, Unusual Navigation. Winning fonts skew editorial display foundries (Druk, Basis, FK, GT).
- **Muzli's top-100 2025/26 portfolios:** the recurring stack among featured creative-dev portfolios (Stas Bondar, Karim Saab) is **GSAP + Three.js/WebGL + Barba.js — no React**. Obys Agency is held up as the benchmark for *experimental motion + refined editorial typography, kept minimal*.
- **Codrops 2025 year-in-review:** GSAP was the year's dominant tool (13 of 51 tutorials); signature effects were scroll-driven — layered zoom, elastic grids, SplitText text animation, curved-path scroll, GSAP-driven shaders; standout portfolios were either brutalist/glitchy or 3D/WebGL playgrounds.

**Design philosophy takeaway:** the differentiator is not effect quantity — it's *one coherent motion identity*: strong editorial typography, scroll-as-storytelling, a single memorable interactive signature, and restraint everywhere else.

---

## Recommended direction for this site

The current site already has the right skeleton (design tokens, editorial type with Space Grotesk/Inter, dark/light theme, semantic HTML, no framework). Proposed motion layer, all CDN / no build step:

1. **GSAP core + ScrollTrigger + SplitText** via jsDelivr `<script>` tags (~35 kB gz total): staggered line-mask hero reveal, scroll-scrubbed section entrances, pinned "Work" case-study storytelling.
2. **One signature moment:** either a GSAP-driven canvas/shader hero, a magnetic-cursor + marquee treatment, or (ambitious) a small Three.js scene via import map. One, not all three.
3. **Haikei SVG** layers recolored with existing CSS custom properties for section transitions and the OG image.
4. **Micro-interactions:** DrawSVG scribble-underline on link hover; Flip for theme/filter transitions; the existing rotating "open to work" badge upgraded to scroll-velocity-reactive.
5. **Guardrails:** every effect behind `prefers-reduced-motion`; SplitText's built-in aria handling; lazy-init below-fold triggers; keep Lighthouse performance ≥ 95.

### Sources

Primary: gsap.com (blog/pricing/license/FAQ/showcase), webflow.com updates, ScanCode LicenseDB, npmjs.com (animejs, @fiddle-digital/string-tune — registry API), motion-primitives repo/docs, skiper-ui.com docs, vengenceui.com + GitHub repo, animmasterlib.dev, haikei.app, awwwards.com portfolio winners. Secondary: Codrops (StringTune feature, free-GSAP-plugins demos, 2025 year-in-review), Muzli top-100 portfolios, gsapvault.com and utsubo.com comparisons (bundle-size figures; one refuted claim noted above).
