import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades — Salutti Empresarial" },
      {
        name: "description",
        content:
          "O Governo é o maior comprador do Brasil: mais de R$ 1,03 trilhão movimentado por ano em compras públicas.",
      },
      { property: "og:title", content: "Oportunidades — Salutti Empresarial" },
      { property: "og:description", content: "Mercado público: escala e contratos recorrentes." },
    ],
  }),
  component: Oportunidades,
});

function Oportunidades() {
  return (
    <main>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow-dot"></span>Mercado Público</p>
            <h2>O Governo é o maior comprador do Brasil.</h2>
            <p className="section-sub">
              As compras públicas movimentam mais de R$ 1,03 trilhão por ano, com milhões de
              processos licitatórios em todo o país. Empresas preparadas encontram nesse mercado
              uma oportunidade para ampliar sua atuação e conquistar contratos recorrentes.
            </p>
          </div>

          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-num">R$ 1,03<small>tri</small></span>
              <span className="stat-label">Movimentados anualmente.</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">6M<small>+</small></span>
              <span className="stat-label">Licitações em todo o Brasil.</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">100<small>%</small></span>
              <span className="stat-label">Contratos recorrentes durante todo o ano.</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">3</span>
              <span className="stat-label">Mercado nacional: municípios, estados e Governo Federal.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
