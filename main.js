/* ============================================================
   William Naing — site interactions
   Vanilla JS, no dependencies. Degrades gracefully.
   ============================================================ */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.hidden = open;
    });
    // Close after tapping a link
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.hidden = true;
      });
    });
  }

  /* ---------- Sticky nav border on scroll ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    // Stagger items that share a parent for a subtle cascade
    revealEls.forEach(function (el) {
      var siblings = Array.prototype.slice.call(el.parentElement.children).filter(
        function (c) { return c.classList.contains("reveal"); }
      );
      var idx = siblings.indexOf(el);
      if (idx > 0) el.style.setProperty("--reveal-delay", Math.min(idx, 4) * 70 + "ms");
      observer.observe(el);
    });
  }

  /* ---------- LinkedIn link placeholder ---------- */
  // Replace "#" below with the real LinkedIn URL when available.
  var LINKEDIN_URL = ""; // e.g. "https://www.linkedin.com/in/williamnaing"
  document.querySelectorAll("[data-linkedin]").forEach(function (a) {
    if (LINKEDIN_URL) {
      a.setAttribute("href", LINKEDIN_URL);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    } else {
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("title", "LinkedIn URL coming soon");
      a.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });
})();
