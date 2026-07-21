import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-brass">Erro 404</p>
      <h1 className="font-display text-2xl font-semibold text-forest-deep">
        Página não encontrada
      </h1>
      <Link to="/" className="font-body text-sm text-forest underline underline-offset-2">
        Voltar ao início
      </Link>
    </div>
  )
}
