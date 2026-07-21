import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/types/auth'

interface ProtectedRouteProps {
  children: ReactNode
  /** Se informado, além de logado o usuário precisa ter um destes perfis. */
  allowedRoles?: UserRole[]
}

/**
 * Protege uma rota simulando o comportamento que um backend real teria:
 * - Sem sessão -> redireciona para /login, guardando de onde veio.
 * - Logado mas com perfil não autorizado -> redireciona para o dashboard
 *   correto do próprio perfil (evita que um cliente acesse /admin, etc.).
 */
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-mono text-sm uppercase tracking-widest text-ink-soft">
          Carregando…
        </p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return <>{children}</>
}
