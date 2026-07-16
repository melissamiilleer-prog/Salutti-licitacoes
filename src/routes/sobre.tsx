import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Salutti Empresarial" },
      {
        name: "description",
        content:
          "Experiência que inspira confiança. Mais de 30 anos transformando conhecimento em resultados no mercado de licitações.",
      },
      { property: "og:title", content: "Quem Somos — Salutti Empresarial" },
      { property: "og:description", content: "Experiência que inspira confiança." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <main>
      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <p className="eyebrow"><span className="eyebrow-dot"></span>Sobre a Salutti</p>
            <h2>Experiência que inspira confiança.</h2>
            <p className="section-sub" style={{ maxWidth: 780 }}>
              A SALUTTI é liderada por um CEO com mais de 30 anos de experiência nos setores
              público e corporativo, que transformou esse conhecimento em uma metodologia
              estratégica para ajudar empresas a conquistar oportunidades no mercado de
              licitações. Nossa missão é oferecer inteligência, planejamento e acompanhamento
              completo para gerar resultados consistentes.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <span className="about-n">+30 anos</span>
              <p>de experiência.</p>
            </div>
            <div className="about-card">
              <span className="about-n">Equipe Multidisciplinar</span>
              <p>Especialistas em licitações públicas.</p>
            </div>
            <div className="about-card">
              <span className="about-n">Atuação Nacional</span>
              <p>Licitações municipais, estaduais e federais.</p>
            </div>
            <div className="about-card">
              <span className="about-n">Foco em Resultados</span>
              <p>Estratégia, agilidade e segurança.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
