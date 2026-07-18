/* ============================================================
   William Naing — motion layer
   GSAP 3.13 (core + ScrollTrigger + SplitText, self-hosted).
   Loads after main.js; owns all .reveal choreography when active.
   Exits early under prefers-reduced-motion — main.js falls back.
   ============================================================ */
(function () {
  "use strict";

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);
  if (typeof SplitText !== "undefined") gsap.registerPlugin(SplitText);

  var html = document.documentElement;
  html.classList.add("has-motion");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (finePointer) html.classList.add("has-fine-pointer");

  if (window.__lenis) window.__lenis.on("scroll", ScrollTrigger.update);

  /* ============================================================
     Scramble/decode — mono labels resolve left to right
     ============================================================ */
  var GLYPHS = "!<>-_\\/[]{}=+*^?#·";
  function scramble(el, duration) {
    var original = el.textContent;
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var resolved = Math.floor(original.length * p);
      var out = original.slice(0, resolved);
      for (var i = resolved; i < original.length; i++) {
        out += original[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = original;
    }
    requestAnimationFrame(frame);
  }

  document.querySelectorAll("[data-scramble]").forEach(function (el) {
    if (el.closest(".hero")) return; // hero eyebrow runs in the intro
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: function () { scramble(el, 650); }
    });
  });

  /* ============================================================
     Type choreography — needs real font metrics
     ============================================================ */
  var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  fontsReady.then(function () {

    /* ---- Hero intro ---- */
    var heroTitle = document.querySelector("[data-hero-title]");
    if (heroTitle && typeof SplitText !== "undefined") {
      SplitText.create(heroTitle, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: function (self) {
          gsap.set(heroTitle, { visibility: "visible", opacity: 1, y: 0 });
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.15,
            stagger: 0.09,
            ease: "power4.out",
            delay: 0.1
          });
        }
      });
    } else if (heroTitle) {
      gsap.set(heroTitle, { visibility: "visible", opacity: 1, y: 0 });
    }

    var eyebrow = document.querySelector(".hero__eyebrow");
    if (eyebrow) {
      gsap.set(eyebrow, { opacity: 1, y: 0 });
      scramble(eyebrow, 900);
    }

    var heroCopy = document.querySelector(".hero__grid > div.reveal");
    if (heroCopy) {
      gsap.to(heroCopy, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.55 });
    }

    var portrait = document.querySelector(".hero__portrait");
    if (portrait) {
      gsap.set(portrait, { opacity: 1, y: 0 });
      gsap.from(portrait, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.1,
        ease: "power4.inOut",
        delay: 0.35
      });
      var portraitImg = portrait.querySelector("img");
      if (portraitImg) {
        gsap.from(portraitImg, { scale: 1.18, duration: 1.5, ease: "power3.out", delay: 0.35 });
        /* slow parallax drift as the hero scrolls away */
        gsap.to(portraitImg, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
      }
    }

    var stats = document.querySelector(".hero__stats");
    if (stats) {
      gsap.to(stats, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.85 });
      gsap.to(stats, { "--draw": 1, duration: 1.2, ease: "power2.inOut", delay: 0.85 });
    }

    /* ---- Section titles: masked line reveals ---- */
    if (typeof SplitText !== "undefined") {
      document.querySelectorAll("[data-split]").forEach(function (el) {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: function (self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.95,
              stagger: 0.09,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true }
            });
          }
        });
      });
    } else {
      gsap.set("[data-split]", { visibility: "visible" });
    }

    ScrollTrigger.refresh();
  });

  /* ============================================================
     Generic reveals — everything outside the hero
     ============================================================ */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal")).filter(function (el) {
    return !el.closest(".hero");
  });
  ScrollTrigger.batch(revealEls, {
    start: "top 88%",
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true
      });
    }
  });

  /* ============================================================
     Self-drawing hairlines
     ============================================================ */
  document.querySelectorAll(".timeline__item, .work__item").forEach(function (el) {
    gsap.to(el, {
      "--draw": 1,
      duration: 1.1,
      ease: "power2.inOut",
      scrollTrigger: { trigger: el, start: "top 90%", once: true }
    });
  });

  /* ============================================================
     Ghost numerals — slow counter-scroll drift
     ============================================================ */
  document.querySelectorAll(".caps__ghost").forEach(function (el) {
    gsap.fromTo(el, { yPercent: -85 }, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* ============================================================
     Marquee + badge — scroll-velocity reactive
     ============================================================ */
  var track = document.querySelector(".marquee__track");
  var badge = document.querySelector(".badge__ring");
  var marqueeTween = track ? gsap.to(track, { xPercent: -50, duration: 24, ease: "none", repeat: -1 }) : null;
  var badgeTween = badge ? gsap.to(badge, { rotation: 360, duration: 22, ease: "none", repeat: -1, transformOrigin: "50% 50%" }) : null;

  if (marqueeTween || badgeTween) {
    var settle = gsap.delayedCall(0.35, function () {
      if (marqueeTween) gsap.to(marqueeTween, { timeScale: 1, duration: 0.8, overwrite: true });
      if (badgeTween) gsap.to(badgeTween, { timeScale: 1, duration: 0.8, overwrite: true });
    }).pause();
    ScrollTrigger.create({
      onUpdate: function (self) {
        var v = self.getVelocity();
        var boost = gsap.utils.clamp(1, 5, 1 + Math.abs(v) / 700);
        var dir = v < 0 ? -1 : 1;
        if (marqueeTween) gsap.to(marqueeTween, { timeScale: dir * boost, duration: 0.2, overwrite: true });
        if (badgeTween) gsap.to(badgeTween, { timeScale: boost, duration: 0.2, overwrite: true });
        settle.restart(true);
      }
    });
  }

  /* ============================================================
     Scroll progress + hide-on-scroll nav
     ============================================================ */
  var bar = document.querySelector(".progress__bar");
  var nav = document.querySelector(".nav");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: function (self) {
      if (bar) gsap.set(bar, { scaleX: self.progress });
      if (nav) {
        if (self.direction === 1 && window.scrollY > 260) nav.classList.add("is-hidden");
        else nav.classList.remove("is-hidden");
      }
    }
  });

  /* ============================================================
     Magnetic hover
     ============================================================ */
  if (finePointer) {
    document.querySelectorAll(".btn, .theme-toggle, .contact__email").forEach(function (el) {
      var xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.32);
        yTo((e.clientY - r.top - r.height / 2) * 0.38);
      });
      el.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
    });
  }

  /* ============================================================
     Custom cursor
     ============================================================ */
  if (finePointer) {
    var dot = document.querySelector(".cursor__dot");
    var ring = document.querySelector(".cursor__ring");
    if (dot && ring) {
      gsap.set([dot, ring], { xPercent: 0, yPercent: 0, autoAlpha: 0 });
      var dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2" });
      var dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2" });
      var rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
      var ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
      var shown = false;
      window.addEventListener("pointermove", function (e) {
        if (!shown) { gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 }); shown = true; }
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      }, { passive: true });
      document.documentElement.addEventListener("mouseleave", function () {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 }); shown = false;
      });
      document.addEventListener("mouseover", function (e) {
        var hit = e.target.closest("a, button, .stack__item");
        gsap.to(ring, { scale: hit ? 1.7 : 1, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: hit ? 0.4 : 1, duration: 0.3, ease: "power3.out" });
      });
    }
  }

  /* ============================================================
     Constellation — the signature hero canvas.
     Nodes drift; connections form between neighbours and, on fine
     pointers, wire themselves to the cursor. "I open doors."
     ============================================================ */
  var canvas = document.getElementById("constellation");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, nodes = [], running = true, inView = true;
    var pointer = { x: -9999, y: -9999, active: false };
    var LINK_DIST = 120, CURSOR_DIST = 170;

    var colors = { ink: "#333", accent: "#3355bb" };
    function readColors() {
      var cs = getComputedStyle(html);
      colors.ink = cs.getPropertyValue("--color-ink").trim() || colors.ink;
      colors.accent = cs.getPropertyValue("--color-accent").trim() || colors.accent;
    }
    readColors();
    new MutationObserver(readColors).observe(html, { attributes: true, attributeFilter: ["data-theme"] });

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = gsap.utils.clamp(36, 88, Math.round((W * H) / 16000));
      while (nodes.length < target) {
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: 1 + Math.random() * 1.3
        });
      }
      nodes.length = target;
    }
    resize();
    window.addEventListener("resize", resize);

    if (finePointer) {
      window.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
        pointer.active = pointer.x > 0 && pointer.x < W && pointer.y > 0 && pointer.y < H;
      }, { passive: true });
    }

    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
    }).observe(canvas);
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
    });

    function step() {
      requestAnimationFrame(step);
      if (!running || !inView) return;
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dxv, dyv, d2, alpha;

      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (pointer.active) {
          dxv = pointer.x - a.x; dyv = pointer.y - a.y;
          d2 = dxv * dxv + dyv * dyv;
          if (d2 < CURSOR_DIST * CURSOR_DIST) {
            a.vx += dxv * 0.000045; a.vy += dyv * 0.000045;
          }
        }
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        a.x = Math.max(0, Math.min(W, a.x));
        a.y = Math.max(0, Math.min(H, a.y));
        var sp = a.vx * a.vx + a.vy * a.vy;
        if (sp > 0.35) { a.vx *= 0.96; a.vy *= 0.96; }
      }

      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dxv = a.x - b.x; dyv = a.y - b.y;
          d2 = dxv * dxv + dyv * dyv;
          if (d2 < LINK_DIST * LINK_DIST) {
            alpha = 0.16 * (1 - Math.sqrt(d2) / LINK_DIST);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = colors.ink;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (pointer.active) {
          dxv = a.x - pointer.x; dyv = a.y - pointer.y;
          d2 = dxv * dxv + dyv * dyv;
          if (d2 < CURSOR_DIST * CURSOR_DIST) {
            alpha = 0.5 * (1 - Math.sqrt(d2) / CURSOR_DIST);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = colors.accent;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.4;
      ctx.fillStyle = colors.ink;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    step();
  }
})();
