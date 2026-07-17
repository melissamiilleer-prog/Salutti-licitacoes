(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Header scroll shadow ---------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------------- Donut chart (modalidades) hover sync ---------------- */
  var donutLegend = document.getElementById("donutLegend");
  var donutSvg = document.getElementById("donutSvg");
  if (donutLegend && donutSvg) {
    var setActive = function (key) {
      donutLegend.querySelectorAll("li").forEach(function (li) {
        li.classList.toggle("is-active", li.getAttribute("data-key") === key);
      });
      donutSvg.querySelectorAll("circle[data-key]").forEach(function (c) {
        c.classList.toggle("is-active", key ? c.getAttribute("data-key") === key : false);
      });
    };
    donutLegend.querySelectorAll("li").forEach(function (li) {
      var key = li.getAttribute("data-key");
      li.addEventListener("mouseenter", function () { setActive(key); });
      li.addEventListener("mouseleave", function () { setActive(null); });
    });
    donutSvg.querySelectorAll("circle[data-key]").forEach(function (c) {
      var key = c.getAttribute("data-key");
      c.addEventListener("mouseenter", function () { setActive(key); });
      c.addEventListener("mouseleave", function () { setActive(null); });
    });
  }

  /* ---------------- Contact form -> WhatsApp deep link (no backend) ---------------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("cf-nome").value.trim();
      var empresa = document.getElementById("cf-empresa").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      var mensagem = document.getElementById("cf-mensagem").value.trim();

      if (!nome) {
        document.getElementById("cf-nome").focus();
        return;
      }

      var lines = ["Olá, meu nome é " + nome + "."];
      if (empresa) lines.push("Empresa: " + empresa + ".");
      if (email) lines.push("E-mail: " + email + ".");
      if (mensagem) lines.push("Mensagem: " + mensagem);
      else lines.push("Quero saber mais sobre a consultoria em licitações.");

      var text = encodeURIComponent(lines.join(" "));
      window.open("https://wa.me/5511988554434?text=" + text, "_blank", "noopener");
    });
  }
})();
