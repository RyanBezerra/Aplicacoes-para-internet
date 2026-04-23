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
    sabores.forEach(function (texto) {
      var span = document.createElement("span");
      span.className = "tag-pill";
      span.setAttribute("role", "listitem");
      span.textContent = texto;
      tagsGastro.appendChild(span);
    });
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

})();
