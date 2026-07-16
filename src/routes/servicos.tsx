import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Salutti Empresarial" },
      {
        name: "description",
        content:
          "Consultoria estratégica em licitações públicas: análise de oportunidades, editais, propostas e gestão completa.",
      },
      { property: "og:title", content: "Serviços — Salutti Empresarial" },
      { property: "og:description", content: "Consultoria estratégica em licitações públicas." },
    ],
  }),
  component: Servicos,
});

function Servicos() {
  return (
    <main>
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow-dot"></span>Nossos Serviços</p>
            <h2>Soluções completas para empresas que desejam atuar no mercado público.</h2>
          </div>

          <div className="split-block">
            <div>
              <p className="section-sub">
                A SALUTTI oferece consultoria estratégica em licitações públicas, conduzindo sua
                empresa desde a identificação das oportunidades até a assinatura do contrato, com
                segurança, inteligência e acompanhamento especializado.
              </p>
            </div>
            <div>
              <figure className="photo-interactive">
                <img src="/assets/licitacoes.jpg" alt="Documentos e legislação de licitações públicas" loading="lazy" />
              </figure>
            </div>
          </div>

          <div className="card-grid card-grid-4">
            <article className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.49 19l-5-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg></span>
              <h3>Análise de Oportunidades</h3>
              <p>Identificação de licitações alinhadas ao perfil da sua empresa.</p>
            </article>
            <article className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6Zm8 1.5V8h4.5ZM8 12h8v2H8Zm0 4h8v2H8Zm0-8h4v2H8Z"/></svg></span>
              <h3>Análise de Editais</h3>
              <p>Avaliação técnica dos requisitos e da viabilidade de participação.</p>
            </article>
            <article className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75Zm14.71-9.04a1 1 0 0 0 0-1.41l-2.5-2.5a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75Z"/></svg></span>
              <h3>Preparação da Proposta</h3>
              <p>Organização da documentação e elaboração da proposta.</p>
            </article>
            <article className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4Z"/></svg></span>
              <h3>Gestão da Licitação</h3>
              <p>Acompanhamento completo do pregão até a homologação e contratação.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
