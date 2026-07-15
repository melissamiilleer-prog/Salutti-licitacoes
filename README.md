# Salutti Empresarial — site institucional

Site estático (HTML + CSS + JS puro, sem build, sem banco de dados).

Conteúdo do site (versão enxuta): abertura (hero) + bloco "Quem Somos"
(O que somos / Onde atuamos / Por que atuamos / Resultado que esperamos)
+ contato.

## Por que as imagens não aparecem no GitHub

As causas mais comuns, em ordem de probabilidade:

1. **Você está olhando o repositório em github.com, não o site publicado.**
   O github.com só mostra os arquivos (código-fonte); ele não "roda" o
   site. Para ver o site de verdade, com imagens e estilo, é preciso
   publicar no **GitHub Pages** (passo a passo abaixo) e abrir a URL
   `https://SEU-USUARIO.github.io/salutti-site/`.

2. **A pasta `assets/` não foi enviada por completo.** Se você arrastou
   os arquivos um a um pela interface do GitHub (em vez de enviar a pasta
   inteira ou usar `git push`), é fácil a subpasta `assets/` não ser
   criada corretamente, ou algum arquivo ficar de fora. Confira no
   repositório se existe a pasta `assets/` com estes 3 arquivos dentro:
   `logo.png`, `logo.jpeg`, `hero.jpg`.

3. **Letras maiúsculas/minúsculas diferentes.** GitHub Pages é
   case-sensitive (diferente do Windows). Os nomes dos arquivos e das
   pastas precisam ser exatamente `assets/logo.png`, `assets/hero.jpg`
   etc. — tudo minúsculo, igual está no código.

Se seguir o passo a passo abaixo do zero (criar o repositório e enviar
a pasta inteira de uma vez), o problema não deve acontecer.

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
2. Envie estes arquivos mantendo a estrutura de pastas (o mais seguro é
   arrastar a pasta `salutti-site` inteira para a área de upload do
   GitHub, ou usar `git add . && git commit -m "site" && git push`):
   ```
   salutti-site/
     index.html
     styles.css
     script.js
     assets/
       logo.png
       logo.jpeg
       hero.jpg
   ```
3. No repositório: **Settings → Pages → Build and deployment → Source:**
   `Deploy from a branch` → branch `main`, pasta `/ (root)` → **Save**.
4. Em 1–2 minutos o site fica no ar em
   `https://SEU-USUARIO.github.io/salutti-site/`. É essa URL que mostra
   o site completo, com imagens — não a página do repositório.
5. (Opcional) Depois de saber a URL final, atualize em `index.html` as tags
   `<link rel="canonical">`, `og:image` e `twitter:image` no `<head>` com o
   endereço completo, para as prévias de link no WhatsApp/Instagram
   funcionarem certinho.

## Estrutura

- `index.html` — todo o conteúdo (Hero, Quem Somos, Contato).
- `styles.css` — todo o visual (cores, tipografia, layout).
- `script.js` — menu mobile e o botão de WhatsApp do formulário de contato.
- `assets/` — logo (`logo.png`, `logo.jpeg`) e foto de abertura (`hero.jpg`).

Não há dependência de backend, banco de dados ou build step — é só HTML
estático, funciona em qualquer hospedagem (GitHub Pages, Netlify, Vercel,
Hostinger etc.).
