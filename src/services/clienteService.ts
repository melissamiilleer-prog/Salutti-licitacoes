import { MOCK_CLIENTES } from '@/data/mockClientes'
import type { Cliente, ClienteFormData, ClienteStatus } from '@/types/cliente'

/**
 * Camada de serviço do módulo de Clientes.
 *
 * Hoje: opera sobre um array em memória (`clientes`), seguindo o mesmo
 * princípio de `src/services/authService.ts` — simula uma tabela de banco
 * de dados e uma latência de rede real.
 *
 * Futuramente (Supabase): trocar o corpo de cada método por chamadas ao
 * client do Supabase, mantendo a mesma assinatura:
 *   - list()   -> supabase.from('clientes').select('*', { count: 'exact' })
 *                  .ilike(...) .eq('status', ...) .range(from, to)
 *   - getById() -> supabase.from('clientes').select('*').eq('id', id).single()
 *   - create() -> supabase.from('clientes').insert(...).select().single()
 *                  + supabase.auth.admin.createUser({ email, password })
 *                    para os campos da aba "Acesso ao Sistema"
 *   - update() -> supabase.from('clientes').update(...).eq('id', id)
 *   - remove() -> supabase.from('clientes').delete().eq('id', id)
 * Nenhum outro arquivo (página, tabela, formulário) precisa mudar, pois
 * todos dependem apenas dos tipos definidos em src/types/cliente.ts.
 */

/** "Tabela" em memória — reinicia a cada reload da página. */
const clientes: Cliente[] = [...MOCK_CLIENTES]

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function gerarId(): string {
  return `cli-${Math.random().toString(36).slice(2, 10)}`
}

export interface ClienteListParams {
  search?: string
  status?: ClienteStatus | 'todos'
  page: number
  pageSize: number
}

export interface ClienteListResult {
  data: Cliente[]
  total: number
}

function correspondeABusca(cliente: Cliente, termoBusca: string): boolean {
  const termo = termoBusca.trim().toLowerCase()
  if (!termo) return true
  const cnpjSomenteDigitos = cliente.empresa.cnpj.replace(/\D/g, '')
  const termoSomenteDigitos = termo.replace(/\D/g, '')

  return (
    cliente.empresa.razaoSocial.toLowerCase().includes(termo) ||
    cliente.empresa.nomeFantasia.toLowerCase().includes(termo) ||
    (termoSomenteDigitos.length > 0 && cnpjSomenteDigitos.includes(termoSomenteDigitos))
  )
}

export const clienteService = {
  async list(params: ClienteListParams): Promise<ClienteListResult> {
    await delay(350)

    const { search = '', status = 'todos', page, pageSize } = params

    const filtrados = clientes.filter((cliente) => {
      const statusOk = status === 'todos' || cliente.acesso.status === status
      return statusOk && correspondeABusca(cliente, search)
    })

    const ordenados = [...filtrados].sort((a, b) =>
      a.empresa.razaoSocial.localeCompare(b.empresa.razaoSocial, 'pt-BR')
    )

    const inicio = (page - 1) * pageSize
    const pagina = ordenados.slice(inicio, inicio + pageSize)

    return { data: pagina, total: filtrados.length }
  },

  async getById(id: string): Promise<Cliente | null> {
    await delay(200)
    return clientes.find((c) => c.id === id) ?? null
  },

  async create(formData: ClienteFormData): Promise<Cliente> {
    await delay(400)

    const agora = new Date().toISOString()
    const novoCliente: Cliente = {
      id: gerarId(),
      empresa: { ...formData.empresa },
      endereco: { ...formData.endereco },
      contato: { ...formData.contato },
      acesso: { ...formData.acesso },
      observacoes: formData.observacoes,
      criadoEm: agora,
      atualizadoEm: agora,
    }

    // NOTA (Supabase): aqui entraria supabase.auth.admin.createUser({
    //   email: formData.acesso.emailLogin, password: formData.senhaTemporaria,
    // }) antes de gravar o registro em `clientes`.
    clientes.unshift(novoCliente)
    return novoCliente
  },

  async update(id: string, formData: ClienteFormData): Promise<Cliente> {
    await delay(400)

    const index = clientes.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error('Cliente não encontrado.')
    }

    const atualizado: Cliente = {
      ...clientes[index],
      empresa: { ...formData.empresa },
      endereco: { ...formData.endereco },
      contato: { ...formData.contato },
      acesso: { ...formData.acesso },
      observacoes: formData.observacoes,
      atualizadoEm: new Date().toISOString(),
    }

    // NOTA (Supabase): se formData.senhaTemporaria vier preenchida aqui,
    // significa reset de senha -> supabase.auth.admin.updateUserById(...).
    clientes[index] = atualizado
    return atualizado
  },

  async remove(id: string): Promise<void> {
    await delay(300)
    const index = clientes.findIndex((c) => c.id === id)
    if (index !== -1) {
      clientes.splice(index, 1)
    }
  },

  /** Verifica se já existe outro cliente com o mesmo CNPJ (usado na validação do formulário). */
  async cnpjJaCadastrado(cnpj: string, ignorarId?: string): Promise<boolean> {
    await delay(150)
    const digitos = cnpj.replace(/\D/g, '')
    return clientes.some(
      (c) => c.id !== ignorarId && c.empresa.cnpj.replace(/\D/g, '') === digitos
    )
  },
}
