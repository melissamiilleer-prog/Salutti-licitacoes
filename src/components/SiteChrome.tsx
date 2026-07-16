import { Link } from "@tanstack/react-router";
import { useState } from "react";

const WA_LINK =
  "https://wa.me/5511988554434?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20Salutti%20sobre%20licita%C3%A7%C3%B5es.";

function WhatsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1zM12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2z" />
    </svg>
  );
}

const NAV = [
  { to: "/servicos", label: "Serviços" },
  { to: "/metodologia", label: "Metodologia" },
  { to: "/oportunidades", label: "Oportunidades" },
  { to: "/sobre", label: "Quem Somos" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header" id="topo">
      <div className="wrap header-inner">
        <Link to="/" className="brand" aria-label="Salutti Empresarial, página inicial">
          <img src="/assets/logo-wide.png" alt="Salutti Empresarial" className="brand-mark" />
        </Link>

        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Navegação principal">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "is-active" }}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <a className="btn btn-brass btn-sm" href={WA_LINK} target="_blank" rel="noopener">
            <WhatsIcon />
            Falar no WhatsApp
          </a>
        </div>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img
            src="/assets/logo-wide.png"
            alt="Salutti Empresarial"
            className="brand-mark brand-mark-footer"
          />
          <p>
            Especialistas em licitações inteligentes, transformando o mercado público em
            crescimento previsível para sua empresa.
          </p>
        </div>

        <div className="footer-col">
          <h5>Navegação</h5>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h5>Contato</h5>
          <a href="mailto:contato@saluttiempresarial.com.br">contato@saluttiempresarial.com.br</a>
          <a href="tel:+5511988554434">(11) 98855-4434</a>
          <a href={WA_LINK} target="_blank" rel="noopener">
            Falar no WhatsApp
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Salutti Empresarial. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

export function WhatsFab() {
  return (
    <a
      className="fab-whatsapp"
      href={WA_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
    >
      <WhatsIcon />
    </a>
  );
}

export { WA_LINK };
