import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ROLE_HOME_ROUTE } from '@/types/auth'

/** Ponto único que decide "para onde este usuário vai" com base no perfil.
 *  Usado logo após o login e como fallback em rotas genéricas. */
export function RoleRedirect() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={ROLE_HOME_ROUTE[user.role]} replace />
}
