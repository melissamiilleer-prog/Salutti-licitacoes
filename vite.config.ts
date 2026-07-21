import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serve o projeto em https://<usuario>.github.io/<repositorio>/,
  // não na raiz do domínio — sem isso, os arquivos em dist/assets são
  // referenciados como "/assets/..." e dão 404 (tela em branco). Se o
  // domínio/caminho de publicação mudar no futuro, ajuste aqui.
  base: '/Salutti-licitacoes/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
