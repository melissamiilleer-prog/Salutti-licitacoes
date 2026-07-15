# Salutti Empresarial — site institucional

Site estático (HTML + CSS + JS puro, sem build, sem banco de dados).

## Por que a prévia local ficou preta / sem estilo?

Se você abriu o `index.html` **direto de dentro do .zip** (duplo clique no
Explorer, sem extrair antes), o Chrome/Edge bloqueia CSS e JavaScript desse
arquivo por segurança (proteção contra "HTML dentro de ZIP"). O site não
está quebrado — só precisa ser aberto de um jeito que o navegador confie.

**Para testar localmente antes de subir pro GitHub:**

1. Extraia o `.zip` de verdade: botão direito → **Extrair tudo…** → escolha
   uma pasta normal (Área de Trabalho, Documentos etc.).
2. Abra a pasta extraída e dê duplo clique no `index.html` **de dentro dela**
   (não de dentro do zip).

Se ainda assim aparecer algo estranho, o jeito mais garantido é rodar um
servidor local (evita 100% dos problemas de `file://`):

```bash
cd salutti-site
python -m http.server 8000
# depois abra http://localhost:8000 no navegador
```

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `salutti-site`).
2. Envie estes arquivos mantendo a estrutura de pastas:
   ```
   salutti-site/
     index.html
     styles.css
     script.js
     assets/
       logo.png
       hero.jpg
       team-meeting.jpg
       team-data.jpg
       team-office.jpg
       team-desks.jpg
       brazil-globe.jpg
   ```
3. No repositório: **Settings → Pages → Build and deployment → Source:**
   `Deploy from a branch` → branch `main`, pasta `/ (root)` → **Save**.
4. Em 1–2 minutos o site fica no ar em
   `https://SEU-USUARIO.github.io/salutti-site/`.
5. (Opcional) Depois de saber a URL final, atualize em `index.html` as tags
   `<link rel="canonical">`, `og:image` e `twitter:image` no `<head>` com o
   endereço completo, para as prévias de link no WhatsApp/Instagram
   funcionarem certinho.

## Estrutura

- `index.html` — todo o conteúdo e seções (Hero, Serviços, Metodologia,
  Por que Investir, Quem Somos, Contato).
- `styles.css` — todo o visual (cores, tipografia, layout).
- `script.js` — donut chart, gráfico do case macarrão, funil, acordeão do
  SICAF, timeline, lightbox das fotos, menu mobile e o botão de WhatsApp do
  formulário de contato.
- `assets/` — logo e fotos.

Não há dependência de backend, banco de dados ou build step — é só HTML
estático, funciona em qualquer hospedagem (GitHub Pages, Netlify, Vercel,
Hostinger etc.).
