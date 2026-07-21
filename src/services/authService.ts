import { MOCK_USERS } from '@/data/mockUsers'
import type { AuthUser, LoginCredentials } from '@/types/auth'

const SESSION_STORAGE_KEY = 'salutti:session'

/** Latência artificial para simular uma chamada de rede real. */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Camada de serviço de autenticação.
 *
 * Hoje: valida contra a lista MOCK_USERS e guarda a sessão no localStorage.
 * Futuramente (Supabase): trocar o corpo de `signIn` por
 *   `supabase.auth.signInWithPassword({ email, password })`,
 * trocar `signOut` por `supabase.auth.signOut()`, e `getSession` por
 * `supabase.auth.getSession()` — o restante do app (Context, rotas
 * protegidas, dashboards) não precisa mudar, pois todos dependem apenas
 * do contrato definido em `AuthContextValue`.
 */
export const authService = {
  async signIn(
    credentials: LoginCredentials
  ): Promise<{ user: AuthUser | null; error?: string }> {
    await delay(400)

    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === credentials.email.trim().toLowerCase()
    )

    if (!found || found.password !== credentials.password) {
      return { user: null, error: 'E-mail ou senha inválidos.' }
    }

    const { password: _password, ...user } = found
    void _password

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
    return { user }
  },

  async signOut(): Promise<void> {
    await delay(150)
    localStorage.removeItem(SESSION_STORAGE_KEY)
  },

  /** Recupera a sessão salva (equivalente a restaurar sessão do Supabase ao recarregar a página). */
  getSession(): AuthUser | null {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },
}
