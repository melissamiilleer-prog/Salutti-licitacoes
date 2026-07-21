import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { ROLE_HOME_ROUTE } from '@/types/auth'

export function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated && user) {
    return <Navigate to={ROLE_HOME_ROUTE[user.role]} replace />
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold text-forest-deep">
          Sistema Salutti Licitações
        </h1>
        <p className="mt-3 max-w-xl font-body text-ink-soft">
          Área restrita para administradores, funcionários e clientes acompanharem
          o andamento das licitações.
        </p>
        <Button className="mt-8" onClick={() => navigate('/login')}>
          Entrar no sistema
        </Button>
      </main>
    </div>
  )
}
