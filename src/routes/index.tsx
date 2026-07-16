import { createFileRoute, Link } from "@tanstack/react-router";
import { WA_LINK } from "../components/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salutti Empresarial | Licitações Públicas Rentáveis" },
      {
        name: "description",
        content:
          "Transforme licitações públicas em negócios rentáveis com a consultoria estratégica da Salutti Empresarial.",
      },
      { property: "og:image", content: "/assets/hero.jpg" },
      { name: "twitter:image", content: "/assets/hero.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main id="conteudo">
      <section className="hero" aria-label="Abertura">
        <div className="hero-media">
          <img src="/assets/hero.jpg" alt="Equipe da Salutti analisando licitações" />
          <div className="hero-scrim"></div>
        </div>

        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot"></span>Consultoria em Licitações Públicas
            </p>
            <h1>
              Transforme Licitações Públicas em{" "}
              <span className="accent-brass">Negócios Rentáveis</span>
            </h1>
            <p className="hero-lede">
              Apoiamos sua empresa em cada etapa do processo licitatório com clareza e
              eficiência.
            </p>

            <div className="hero-actions">
              <a className="btn btn-brass btn-lg" href={WA_LINK} target="_blank" rel="noopener">
                Falar no WhatsApp
              </a>
              <Link to="/servicos" className="btn btn-outline btn-lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.45)" }}>
                Conhecer serviços
              </Link>
            </div>
          </div>

          <div className="seal" aria-hidden="true">
            <svg viewBox="0 0 220 220" width="220" height="220" className="seal-svg">
              <defs>
                <path
                  id="sealCircle"
                  d="M110,110 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
                />
              </defs>
              <circle cx="110" cy="110" r="104" fill="none" stroke="#C79C42" strokeWidth="1.4" />
              <circle cx="110" cy="110" r="86" fill="none" stroke="#C79C42" strokeWidth="1" />
              <text style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10.4, letterSpacing: 2 }} fill="#F6F3EA">
                <textPath href="#sealCircle" startOffset="0%">
                  SALUTTI EMPRESARIAL • LICITAÇÕES • ESTRATÉGIA •{" "}
                </textPath>
              </text>
              <g transform="translate(110,110)">
                <circle r="34" fill="rgba(169,130,47,0.18)" stroke="#C79C42" strokeWidth="1.4" />
                <text x="0" y="10" textAnchor="middle" style={{ fontFamily: "Fraunces, serif", fontSize: 34, fontWeight: 700 }} fill="#C79C42">
                  S
                </text>
              </g>
            </svg>
            <span className="seal-caption">
              selo de<br />processo certificado
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow-dot"></span>Por onde começar</p>
            <h2>Uma jornada estratégica no mercado público.</h2>
            <p className="section-sub">
              Da identificação de oportunidades ao contrato assinado, a SALUTTI conduz sua
              empresa com inteligência, planejamento e acompanhamento completo.
            </p>
          </div>

          <div className="card-grid card-grid-4">
            <Link to="/servicos" className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.49 19l-5-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg></span>
              <h3>Serviços</h3>
              <p>Consultoria completa em licitações públicas.</p>
            </Link>
            <Link to="/metodologia" className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6Zm8 1.5V8h4.5ZM8 12h8v2H8Zm0 4h8v2H8Zm0-8h4v2H8Z"/></svg></span>
              <h3>Metodologia</h3>
              <p>Processo estratégico em quatro etapas.</p>
            </Link>
            <Link to="/oportunidades" className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/></svg></span>
              <h3>Oportunidades</h3>
              <p>O maior comprador do Brasil é o Governo.</p>
            </Link>
            <Link to="/sobre" className="feature-card">
              <span className="feature-ico"><svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6Z"/></svg></span>
              <h3>Quem Somos</h3>
              <p>+30 anos de experiência estratégica.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
