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

  /* ---------------- Donut chart: % Pregão por modalidade 2025 ---------------- */
  var donutData = [
    { label: "Pregão", value: 51.26, color: "#A9822F" },
    { label: "Pregão - Registro de Preço", value: 30.71, color: "#0B5C3C" },
    { label: "Concorrência", value: 8.83, color: "#7FD9AC" },
    { label: "Dispensa de Licitação", value: 4.73, color: "#D9772E" },
    { label: "Inexigibilidade de Licitação", value: 3.64, color: "#2C6FA8" },
    { label: "Tomada de Preços", value: 0.83, color: "#8B98C7" }
  ];

  (function buildDonut() {
    var svg = document.getElementById("donutChart");
    var legend = document.getElementById("donutLegend");
    var pctEl = document.getElementById("donutPct");
    var labelEl = document.getElementById("donutLabel");
    if (!svg) return;

    var cx = 120, cy = 120, rOuter = 100, rInner = 62;
    var total = donutData.reduce(function (s, d) { return s + d.value; }, 0);
    var angle = -90;

    function polar(cx, cy, r, angleDeg) {
      var rad = (angleDeg * Math.PI) / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    }

    donutData.forEach(function (d, i) {
      var sweep = (d.value / total) * 360;
      var start = angle;
      var end = angle + sweep;
      angle = end;

      var p1 = polar(cx, cy, rOuter, start);
      var p2 = polar(cx, cy, rOuter, end);
      var p3 = polar(cx, cy, rInner, end);
      var p4 = polar(cx, cy, rInner, start);
      var large = sweep > 180 ? 1 : 0;

      var pathData = [
        "M", p1[0], p1[1],
        "A", rOuter, rOuter, 0, large, 1, p2[0], p2[1],
        "L", p3[0], p3[1],
        "A", rInner, rInner, 0, large, 0, p4[0], p4[1],
        "Z"
      ].join(" ");

      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);
      path.setAttribute("fill", d.color);
      path.dataset.index = i;
      svg.appendChild(path);

      var li = document.createElement("li");
      li.innerHTML = '<span class="sw" style="background:' + d.color + '"></span><span>' + d.label + " — " + d.value.toFixed(2).replace(".", ",") + "%</span>";
      li.dataset.index = i;
      legend.appendChild(li);

      function activate() {
        svg.querySelectorAll("path").forEach(function (p) { p.classList.remove("is-active"); });
        legend.querySelectorAll("li").forEach(function (l) { l.classList.remove("is-active"); });
        path.classList.add("is-active");
        li.classList.add("is-active");
        pctEl.textContent = d.value.toFixed(2).replace(".", ",") + "%";
        labelEl.textContent = d.label;
      }
      path.addEventListener("mouseenter", activate);
      path.addEventListener("focus", activate);
      li.addEventListener("mouseenter", activate);
      li.addEventListener("click", activate);
    });
  })();

  /* ---------------- Funnel interactive descriptions ---------------- */
  var funnelDescriptions = [
    "Mapeamos editais compatíveis com o mix e a capacidade da sua empresa, cruzando região, sazonalidade e histórico de preço.",
    "Avaliamos exigências técnicas, documentação e viabilidade comercial antes de comprometer tempo da sua equipe.",
    "Cadastramos a proposta e acompanhamos o pregão em tempo real, com estratégia de lance definida previamente.",
    "Conferimos habilitação e classificação, revisando pendências rapidamente para não perder o resultado por detalhe."
  ];
  var funnelStages = document.querySelectorAll(".funnel-stage[data-stage]");
  var funnelDesc = document.getElementById("funnelDesc");
  funnelStages.forEach(function (btn) {
    function activate() {
      funnelStages.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      funnelDesc.textContent = funnelDescriptions[btn.dataset.stage];
    }
    btn.addEventListener("mouseenter", activate);
    btn.addEventListener("focus", activate);
    btn.addEventListener("click", activate);
  });

  /* ---------------- Timeline (próximos passos) ---------------- */
  var timelineSteps = document.querySelectorAll(".timeline-step");
  timelineSteps.forEach(function (step) {
    step.addEventListener("click", function () {
      var idx = parseInt(step.dataset.step, 10);
      timelineSteps.forEach(function (s) {
        var sIdx = parseInt(s.dataset.step, 10);
        s.classList.remove("is-active", "is-done");
        if (sIdx < idx) s.classList.add("is-done");
        if (sIdx === idx) s.classList.add("is-active");
      });
    });
  });

  /* ---------------- Accordion (SICAF) ---------------- */
  document.querySelectorAll(".acc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc-item");
      var isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".acc-item").forEach(function (i) {
        i.classList.remove("is-open");
        i.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
        i.querySelector(".acc-icon").textContent = "+";
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        btn.querySelector(".acc-icon").textContent = "−";
      }
    });
  });

  /* ---------------- Keyword tabs ---------------- */
  var keywordData = {
    basicos: ["Cimento CP II / CP III / CP V", "Aço CA50 e CA60", "Vergalhão", "Tela soldada", "Treliça", "Cal hidratada", "Argamassa AC1–AC3", "Rejunte", "Pavimentação", "Reforma predial"],
    aco: ["Gerdau", "CSN", "Vergalhão CA50", "Vergalhão CA60", "Barra de aço", "Tela Q92 / Q138 / Q196", "Treliça H8", "Ferragens armadas", "Estruturas metálicas"],
    ferramentas: ["Ferramentas manuais e elétricas", "Equipamentos de oficina", "EPIs", "Materiais hidráulicos", "Materiais elétricos", "Serra mármore", "Esmerilhadeira", "Furadeira", "Martelete", "Compressor"]
  };
  var kwTabs = document.querySelectorAll(".kw-tab");
  var kwPanel = document.getElementById("keywordPanel");
  function renderKeywords(key) {
    kwPanel.innerHTML = "";
    keywordData[key].forEach(function (word) {
      var span = document.createElement("span");
      span.textContent = word;
      kwPanel.appendChild(span);
    });
  }
  kwTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      kwTabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      renderKeywords(tab.dataset.kw);
    });
  });
  renderKeywords("basicos");

  /* ---------------- Case study bar chart (macarrão) ---------------- */
  (function buildCaseChart() {
    var svg = document.getElementById("caseChart");
    if (!svg) return;
    var data = [
      { year: "2024", value: 150219589.44 },
      { year: "2025", value: 312221287.6 },
      { year: "2026", value: 668786343.53 }
    ];
    var max = Math.max.apply(null, data.map(function (d) { return d.value; }));
    var chartW = 420, chartH = 260, padL = 10, padB = 40, padT = 20;
    var barW = 78, gap = (chartW - padL * 2 - barW * data.length) / (data.length - 1);

    var ns = "http://www.w3.org/2000/svg";

    // axis line
    var axis = document.createElementNS(ns, "line");
    axis.setAttribute("x1", padL); axis.setAttribute("x2", chartW - padL);
    axis.setAttribute("y1", chartH - padB); axis.setAttribute("y2", chartH - padB);
    axis.setAttribute("stroke", "rgba(23,35,28,0.18)");
    svg.appendChild(axis);

    data.forEach(function (d, i) {
      var h = ((chartH - padB - padT) * d.value) / max;
      var x = padL + i * (barW + gap);
      var y = chartH - padB - h;

      var rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", barW);
      rect.setAttribute("height", h);
      rect.setAttribute("rx", 6);
      rect.setAttribute("fill", i === data.length - 1 ? "#A9822F" : "#0B5C3C");
      svg.appendChild(rect);

      var label = document.createElementNS(ns, "text");
      label.setAttribute("x", x + barW / 2);
      label.setAttribute("y", chartH - padB + 20);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-family", "IBM Plex Mono, monospace");
      label.setAttribute("font-size", "13");
      label.setAttribute("fill", "#4A5A50");
      label.textContent = d.year;
      svg.appendChild(label);

      var valueText = document.createElementNS(ns, "text");
      valueText.setAttribute("x", x + barW / 2);
      valueText.setAttribute("y", y - 10);
      valueText.setAttribute("text-anchor", "middle");
      valueText.setAttribute("font-family", "Fraunces, serif");
      valueText.setAttribute("font-weight", "700");
      valueText.setAttribute("font-size", "13");
      valueText.setAttribute("fill", "#17231C");
      valueText.style.opacity = "0";
      valueText.style.transition = "opacity .2s ease";
      valueText.textContent =
        "R$ " + (d.value / 1000000).toFixed(1).replace(".", ",") + "M";
      svg.appendChild(valueText);

      rect.addEventListener("mouseenter", function () { valueText.style.opacity = "1"; });
      rect.addEventListener("mouseleave", function () { valueText.style.opacity = "0"; });
      rect.addEventListener("click", function () { valueText.style.opacity = "1"; });
    });
  })();

  /* ---------------- Lightbox for interactive photos ---------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  document.querySelectorAll("img[data-lightbox]").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
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
