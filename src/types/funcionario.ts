/**
 * Tipos do módulo de Cadastro de Funcionários.
 *
 * Segue exatamente o mesmo princípio de src/types/cliente.ts: a integração
 * futura com Supabase deve trocar apenas `src/services/funcionarioService.ts`,
 * mantendo este contrato de dados sem exigir mudanças em componentes ou páginas.
 */

export type FuncionarioStatus = 'ativo' | 'inativo'

export const FUNCIONARIO_STATUS_LABEL: Record<FuncionarioStatus, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
}

/** Perfil de acesso do funcionário dentro do sistema (não confundir com o
 *  perfil de autenticação em src/types/auth.ts, que também inclui "cliente"). */
export type FuncionarioPerfil = 'admin' | 'funcionario'

export const FUNCIONARIO_PERFIL_LABEL: Record<FuncionarioPerfil, string> = {
  admin: 'Administrador',
  funcionario: 'Funcionário',
}

/** Aba 1 — Dados Pessoais */
export interface FuncionarioDadosPessoais {
  nomeCompleto: string
  cpf: string
  dataNascimento: string
  telefone: string
  whatsapp: string
  email: string
}

/** Aba 2 — Cargo */
export interface FuncionarioCargo {
  cargo: string
  departamento: string
  dataAdmissao: string
  observacoes: string
}

/** Aba 3 — Acesso ao sistema.
 *  `senhaTemporaria`/`confirmarSenha` só existem no formulário (nunca são
 *  devolvidos pelo service em listagens/leitura) — na integração com
 *  Supabase Auth, esses dois campos deixam de existir aqui e passam a ser
 *  usados apenas para chamar supabase.auth.admin.createUser /
 *  updateUserById no momento do envio do formulário. */
export interface FuncionarioAcesso {
  emailLogin: string
  perfil: FuncionarioPerfil
  status: FuncionarioStatus
  forcarTrocaSenha: boolean
}

/** Aba 4 — Permissões (estrutura preparada; hoje só clientes/licitações
 *  vinculados por id, sem granularidade de ações — futuramente vira uma
 *  lista de permissões por módulo/ação). */
export interface FuncionarioPermissoes {
  clientesVinculados: string[]
  licitacoesAtribuidas: string[]
}

/** Aba 5 — Histórico. Cada entrada representa uma alteração administrativa
 *  registrada no cadastro do funcionário (mockado; futuramente viria de uma
 *  tabela de auditoria no Supabase). */
export interface FuncionarioHistoricoEntrada {
  id: string
  data: string
  autor: string
  descricao: string
}

export interface Funcionario {
  id: string
  pessoal: FuncionarioDadosPessoais
  cargo: FuncionarioCargo
  acesso: FuncionarioAcesso
  permissoes: FuncionarioPermissoes
  observacoesAdministrativas: string
  historico: FuncionarioHistoricoEntrada[]
  criadoEm: string
  atualizadoEm: string
}

/** Formato usado pelo formulário de criação/edição — inclui os campos de
 *  senha (aba "Acesso ao Sistema") que não fazem parte do registro salvo. */
export interface FuncionarioFormData {
  pessoal: FuncionarioDadosPessoais
  cargo: FuncionarioCargo
  acesso: FuncionarioAcesso
  permissoes: FuncionarioPermissoes
  senhaTemporaria: string
  confirmarSenha: string
  observacoesAdministrativas: string
}

export function criarFuncionarioFormVazio(): FuncionarioFormData {
  return {
    pessoal: {
      nomeCompleto: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      whatsapp: '',
      email: '',
    },
    cargo: {
      cargo: '',
      departamento: '',
      dataAdmissao: '',
      observacoes: '',
    },
    acesso: {
      emailLogin: '',
      perfil: 'funcionario',
      status: 'ativo',
      forcarTrocaSenha: true,
    },
    permissoes: {
      clientesVinculados: [],
      licitacoesAtribuidas: [],
    },
    senhaTemporaria: '',
    confirmarSenha: '',
    observacoesAdministrativas: '',
  }
}

export function funcionarioParaFormData(funcionario: Funcionario): FuncionarioFormData {
  return {
    pessoal: { ...funcionario.pessoal },
    cargo: { ...funcionario.cargo },
    acesso: { ...funcionario.acesso },
    permissoes: {
      clientesVinculados: [...funcionario.permissoes.clientesVinculados],
      licitacoesAtribuidas: [...funcionario.permissoes.licitacoesAtribuidas],
    },
    senhaTemporaria: '',
    confirmarSenha: '',
    observacoesAdministrativas: funcionario.observacoesAdministrativas,
  }
}

export const DEPARTAMENTOS_DISPONIVEIS = [
  'Diretoria',
  'Comercial',
  'Licitações',
  'Jurídico',
  'Financeiro',
  'Tecnologia da Informação',
  'Atendimento ao Cliente',
  'Administrativo',
]
