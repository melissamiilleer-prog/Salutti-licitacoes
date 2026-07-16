import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/metodologia")({
  head: () => ({
    meta: [
      { title: "Metodologia — Salutti Empresarial" },
      {
        name: "description",
        content:
          "Processo estratégico em quatro etapas: identificamos, analisamos, preparamos e acompanhamos cada licitação.",
      },
      { property: "og:title", content: "Metodologia — Salutti Empresarial" },
      { property: "og:description", content: "Processo estratégico para resultados consistentes." },
    ],
  }),
  component: Metodologia,
});

function Metodologia() {
  return (
    <main>
      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow-dot"></span>Como Trabalhamos</p>
            <h2>Um processo estratégico para gerar resultados consistentes.</h2>
          </div>

          <ol className="ticket-list">
            <li><span className="ticket-num">1</span><div><strong>Identificamos</strong><p>Mapeamos oportunidades compatíveis com o seu negócio.</p></div></li>
            <li><span className="ticket-num">2</span><div><strong>Analisamos</strong><p>Estudamos riscos, viabilidade e potencial de cada licitação.</p></div></li>
            <li><span className="ticket-num">3</span><div><strong>Preparamos</strong><p>Organizamos documentos e desenvolvemos propostas competitivas.</p></div></li>
            <li><span className="ticket-num">4</span><div><strong>Acompanhamos</strong><p>Monitoramos todo o processo até a assinatura do contrato.</p></div></li>
          </ol>
        </div>
      </section>
    </main>
  );
}
