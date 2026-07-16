(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
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

  /* ---------------- Contact form -> WhatsApp deep link (no backend) ---------------- */
  var form = document.getElementById("contactForm");
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
})();
