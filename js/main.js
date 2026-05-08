(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("menu-principal");
  var anoAtual = document.getElementById("anoAtual");
  var header = document.querySelector(".header");
  var navLinks = siteNav ? siteNav.querySelectorAll("a[href^='#']") : [];

  if (anoAtual) {
    anoAtual.textContent = String(new Date().getFullYear());
  }

  function closeMenu() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  function openMenu() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      if (siteNav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) closeMenu();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  if (header) {
    function syncScrolled() {
      header.classList.toggle("header--scrolled", window.scrollY > 80);
    }
    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });
  }

})();
