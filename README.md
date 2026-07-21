# Sistema Salutti — Módulo de Autenticação (mock)

App React separado do site institucional estático (`salutti-site/`), criado
para o sistema interno da Salutti (login + dashboards por perfil).

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Credenciais mockadas (senha igual para todos: `123456`)

| Perfil         | E-mail                     | Rota após login |
|----------------|----------------------------|------------------|
| Administrador  | admin@salutti.com          | `/admin`         |
| Funcionário    | funcionario@salutti.com    | `/funcionario`   |
| Cliente        | cliente@empresa.com        | `/cliente`       |

A tela de login (`/login`) tem atalhos que preenchem essas credenciais
automaticamente, só para agilizar testes.

## Como funciona

- **`src/data/mockUsers.ts`** — "banco de dados" mockado dos usuários.
- **`src/services/authService.ts`** — camada isolada que hoje valida contra
  `mockUsers` e guarda a sessão em `localStorage`. É o único arquivo que
  precisa mudar para integrar com Supabase (ver comentários no arquivo).
- **`src/context/AuthContext.tsx`** — estado global de autenticação
  (Context API): usuário logado, `login()`, `logout()`, `isAuthenticated`.
- **`src/components/ProtectedRoute.tsx`** — bloqueia uma rota se não houver
  sessão, e redireciona para o dashboard correto se o perfil logado não for
  um dos permitidos naquela rota (ex.: um cliente tentando abrir `/admin`
  cai automaticamente em `/cliente`).
- **`src/pages/`** — `HomePage`, `LoginPage`, `RoleRedirect` (decide para
  qual dashboard mandar após o login) e os três dashboards
  (`admin/`, `funcionario/`, `cliente/`).

## Rotas

| Rota             | Acesso                          |
|------------------|----------------------------------|
| `/`              | pública                          |
| `/login`         | pública                          |
| `/redirecionando`| logado (decide o destino)        |
| `/admin`         | apenas perfil `admin`             |
| `/funcionario`   | apenas perfil `funcionario`       |
| `/cliente`       | apenas perfil `cliente`           |

## Identidade visual

As cores e fontes em `tailwind.config.js` foram copiadas dos tokens em
`salutti-site/styles.css` (verde-floresta `#0B5C3C`, dourado/brass
`#A9822F`, papel `#F7F4EC`, fontes Fraunces/Source Sans 3/IBM Plex Mono),
para este app já nascer visualmente alinhado ao site institucional, mesmo
sendo um projeto separado.

## Próxima etapa (fora do escopo desta entrega)

Trocar `src/services/authService.ts` por chamadas reais ao Supabase
(`supabase.auth.signInWithPassword`, `signOut`, `getSession`). Nenhum outro
arquivo precisa mudar, pois todos dependem apenas do contrato de
`AuthContextValue` definido em `src/types/auth.ts`.

## Módulo de Cadastro de Clientes (`/admin/clientes`)

Exclusivo do perfil Administrador. Listagem com busca (razão social, nome
fantasia ou CNPJ), filtro por status, paginação, e formulário em 5 abas
(Dados da Empresa, Endereço, Contato, Acesso ao Sistema, Observações).
Dados mockados em `src/data/mockClientes.ts`; CRUD isolado em
`src/services/clienteService.ts`, já com os comentários indicando a troca
para Supabase. O CEP integra de verdade com a API pública ViaCEP
(`src/services/viaCepService.ts`).

## Módulo de Cadastro de Funcionários (`/admin/funcionarios`)

Também exclusivo do perfil Administrador, seguindo exatamente a mesma
arquitetura do módulo de Clientes. Listagem com busca (nome, e-mail ou
cargo), filtro por status, paginação, e formulário em 5 abas:

- **Dados Pessoais** — nome, CPF (validado), data de nascimento, telefone,
  WhatsApp, e-mail.
- **Cargo** — cargo, departamento, data de admissão, observações.
- **Acesso ao Sistema** — e-mail de login, senha temporária/confirmação,
  Perfil (Administrador/Funcionário), Status, "obrigar troca de senha".
- **Permissões** — clientes vinculados e licitações atribuídas (seleção por
  checkbox sobre os dados mockados existentes); há também uma seção
  "Permissões futuras" já no layout, desabilitada, indicando a extensão
  prevista para permissões granulares por módulo/ação.
- **Histórico** — observações administrativas (editáveis) e registro de
  alterações mockado (somente leitura).

Dados mockados em `src/data/mockFuncionarios.ts` (mais
`src/data/mockLicitacoesResumo.ts`, uma lista mínima só para popular a
seleção de licitações na aba Permissões, já que o módulo de Licitações
ainda não existe). CRUD isolado em `src/services/funcionarioService.ts`,
com os mesmos comentários de integração futura com Supabase Auth.

Componentes genéricos reutilizados por ambos os módulos (e por qualquer
tela futura): `Modal`, `ConfirmDialog`, `Tabs`, `Pagination`, `StatusBadge`,
`SelectField`, `TextAreaField`, `CheckboxField`.

## Publicando no GitHub Pages

Este projeto está configurado para publicar em
`https://melissamiilleer-prog.github.io/Salutti-licitacoes/`. Dois pontos
foram ajustados especificamente para isso (sem eles a página fica em branco):

- **`vite.config.ts`** — `base: '/Salutti-licitacoes/'`, para os arquivos em
  `dist/assets` serem referenciados com o subcaminho correto (GitHub Pages
  não serve o projeto na raiz do domínio).
- **`src/App.tsx`** — `<BrowserRouter basename={import.meta.env.BASE_URL}>`,
  para as rotas (`/admin`, `/admin/clientes` etc.) funcionarem dentro desse
  mesmo subcaminho.
- **`scripts/copy-404.mjs`** — roda automaticamente depois do `npm run build`
  (hook `postbuild`) e copia `dist/index.html` para `dist/404.html`. Isso
  resolve o problema de dar refresh (ou acessar um link direto) em uma rota
  como `/admin/clientes`: o GitHub Pages não tem rewrite de rotas de SPA no
  servidor, então serve o `404.html` — que aqui é uma cópia do app inteiro,
  e como a URL na barra de endereço não muda, o React Router carrega a rota
  certa mesmo assim.

**Se o nome do repositório mudar**, atualize o valor de `base` em
`vite.config.ts` para `/<novo-nome-do-repositorio>/`.

### Deploy automático (recomendado)

Há um workflow em `.github/workflows/deploy.yml` que builda e publica a
cada push na branch `main`. Para ativar:

1. No repositório no GitHub, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Dê um push na branch `main` — o workflow builda o projeto e publica
   automaticamente em `https://melissamiilleer-prog.github.io/Salutti-licitacoes/`.

### Deploy manual (alternativa)

```bash
npm run build
```

Isso gera `dist/` (já com o `404.html`). Publique o conteúdo dessa pasta na
branch `gh-pages` do repositório (ou configure o GitHub Pages para servir a
partir de `dist/` na branch que preferir).
