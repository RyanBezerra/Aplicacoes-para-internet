(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("menu-principal");
  var navLinks = siteNav ? siteNav.querySelectorAll("a[href^='#']") : [];
  var form = document.getElementById("formContato");
  var feedback = document.getElementById("formFeedback");
  var btnTopo = document.getElementById("btnTopo");
  var anoAtual = document.getElementById("anoAtual");
  var tagsGastro = document.getElementById("tagsGastro");
  var themeToggle = document.getElementById("themeToggle");

  var sabores = [
    "Tapioca e queijo coalho",
    "Sururu e caldinho",
    "Carne de sol na nata",
    "Mugunzá e doces de festa",
    "Buchada e panelada",
    "Peixes e moquecas",
    "Cartola e doces regionais",
    "Paçoca de pilão",
    "Cachaça artesanal",
    "Rapadura e derivados",
    "Beiju e mingau de milho",
    "Caldeirada de frutos do mar",
  ];

  if (anoAtual) {
    anoAtual.textContent = String(new Date().getFullYear());
  }

  var THEME_KEY = "pb-theme";
  function applyTheme(mode) {
    var root = document.documentElement;
    if (mode === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggle) {
      var isDark = mode === "dark";
      themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
      );
      themeToggle.textContent = isDark ? "Tema claro" : "Tema escuro";
    }
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch (e) {
      /* ignore */
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
    });
  }

  try {
    var storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      applyTheme(storedTheme);
    }
  } catch (e) {
    /* ignore */
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
        if (window.matchMedia("(max-width: 860px)").matches) {
          closeMenu();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  var tabsRoot = document.querySelector("[data-tabs]");
  if (tabsRoot) {
    var tabButtons = tabsRoot.querySelectorAll('[role="tab"]');
    var tabPanels = tabsRoot.querySelectorAll('[role="tabpanel"]');

    function activateTab(selectedBtn) {
      tabButtons.forEach(function (btn) {
        var isSel = btn === selectedBtn;
        btn.classList.toggle("is-active", isSel);
        btn.setAttribute("aria-selected", isSel ? "true" : "false");
        btn.setAttribute("tabindex", isSel ? "0" : "-1");
      });

      tabPanels.forEach(function (panel) {
        var match = panel.id === selectedBtn.getAttribute("aria-controls");
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
    }

    tabButtons.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        activateTab(btn);
      });

      btn.addEventListener("keydown", function (e) {
        var nextIndex = index;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          nextIndex = (index + 1) % tabButtons.length;
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (e.key === "Home") {
          e.preventDefault();
          nextIndex = 0;
        } else if (e.key === "End") {
          e.preventDefault();
          nextIndex = tabButtons.length - 1;
        } else {
          return;
        }
        tabButtons[nextIndex].focus();
        activateTab(tabButtons[nextIndex]);
      });
    });
  }

  if (tagsGastro) {
    var frag = document.createDocumentFragment();
    sabores.forEach(function (texto) {
      var span = document.createElement("span");
      span.className = "tag-pill";
      span.setAttribute("role", "listitem");
      span.textContent = texto;
      frag.appendChild(span);
    });
    tagsGastro.appendChild(frag);
    tagsGastro.setAttribute("role", "list");
  }

  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      feedback.textContent = "";
      feedback.classList.remove("is-success", "is-error");

      var nome = form.nome.value.trim();
      var email = form.email.value.trim();
      var interesse = form.interesse.value;

      if (!nome || !email || !interesse) {
        feedback.textContent = "Preencha nome, e-mail e principal interesse.";
        feedback.classList.add("is-error");
        return;
      }

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        feedback.textContent = "Informe um e-mail válido.";
        feedback.classList.add("is-error");
        return;
      }

      feedback.textContent =
        "Obrigado, " +
        nome.split(/\s+/)[0] +
        "! Seu interesse foi registrado (demonstração — sem envio real).";
      feedback.classList.add("is-success");
      form.reset();
    });
  }

  if (btnTopo) {
    btnTopo.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      var focusTarget = document.getElementById("topo");
      if (focusTarget) focusTarget.focus({ preventScroll: true });
    });
  }

  // Aula 09 — Desafio Extra: aplicar .header--scrolled após 80px de rolagem.
  // Usa requestAnimationFrame para suavizar o evento de scroll.
  var siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    var scrollTicking = false;
    var SCROLL_THRESHOLD = 80;

    function updateHeaderState() {
      var scrolled = window.pageYOffset > SCROLL_THRESHOLD;
      siteHeader.classList.toggle("header--scrolled", scrolled);
      scrollTicking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!scrollTicking) {
          window.requestAnimationFrame(updateHeaderState);
          scrollTicking = true;
        }
      },
      { passive: true }
    );

    updateHeaderState();
  }

})();