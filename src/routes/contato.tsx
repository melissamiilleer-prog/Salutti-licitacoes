import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Salutti Empresarial" },
      {
        name: "description",
        content:
          "Fale com a Salutti Empresarial pelo WhatsApp ou e-mail e transforme sua estratégia de licitações.",
      },
      { property: "og:title", content: "Contato — Salutti Empresarial" },
      { property: "og:description", content: "Fale com a Salutti pelo WhatsApp ou e-mail." },
    ],
  }),
  component: Contato,
});

function WhatsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.3-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1zM12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2z" />
    </svg>
  );
}

function Contato() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    const lines = [`Olá, meu nome é ${nome.trim()}.`];
    if (empresa.trim()) lines.push(`Empresa: ${empresa.trim()}.`);
    if (email.trim()) lines.push(`E-mail: ${email.trim()}.`);
    if (mensagem.trim()) lines.push(`Mensagem: ${mensagem.trim()}`);
    else lines.push("Quero saber mais sobre a consultoria em licitações.");
    const text = encodeURIComponent(lines.join(" "));
    window.open(`https://wa.me/5511988554434?text=${text}`, "_blank", "noopener");
  }

  return (
    <main>
      <section className="section contact-band">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow"><span className="eyebrow-dot"></span>Fale com a Salutti</p>
            <h2>Pronto para transformar sua estratégia de licitações?</h2>
            <p className="section-sub">Responda em poucos campos e conversamos pelo WhatsApp.</p>
          </div>

          <div className="contact-grid">
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <label>
                Nome
                <input type="text" required autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} />
              </label>
              <label>
                Empresa
                <input type="text" autoComplete="organization" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
              </label>
              <label>
                E-mail
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                O que você quer resolver?
                <textarea rows={3} placeholder="Ex.: quero entender se meu segmento tem oportunidade em licitações." value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
              </label>
              <button type="submit" className="btn btn-brass btn-lg btn-block">
                <WhatsIcon />
                Continuar no WhatsApp
              </button>
              <p className="form-hint">Ao enviar, abrimos o WhatsApp com sua mensagem pronta.</p>
            </form>

            <div className="contact-info">
              <a className="contact-line" href="https://wa.me/5511988554434" target="_blank" rel="noopener">
                <span className="contact-ico"><WhatsIcon /></span>
                <span>(11) 98855-4434</span>
              </a>
              <a className="contact-line" href="mailto:contato@saluttiempresarial.com.br">
                <span className="contact-ico">
                  <svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 12l8-5.99V6H4Zm16 12V8.24l-8 6-8-6V18h16Z"/></svg>
                </span>
                <span>contato@saluttiempresarial.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
