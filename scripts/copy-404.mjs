// GitHub Pages não tem como fazer rewrite de rotas de SPA no servidor: se
// alguém acessa (ou dá refresh) diretamente em /admin/clientes, ele procura
// esse caminho como um arquivo real, não encontra, e serve 404.html.
//
// Como 404.html aqui é uma cópia idêntica de index.html, o app React inteiro
// carrega normalmente mesmo nesse "erro" — e como o GitHub Pages preserva a
// URL original na barra de endereço (não redireciona), o BrowserRouter lê
// /admin/clientes corretamente e renderiza a rota certa.
//
// Cross-platform (usa fs do Node em vez de `cp`, que não existe no Windows).
import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))
console.log('dist/404.html criado a partir de dist/index.html (SPA fallback para GitHub Pages).')
