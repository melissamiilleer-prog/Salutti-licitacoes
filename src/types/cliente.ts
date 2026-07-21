/**
 * Tipos do módulo de Cadastro de Clientes.
 *
 * Isolados aqui pelo mesmo motivo do módulo de autenticação (ver
 * src/types/auth.ts): a integração futura com Supabase deve trocar apenas
 * `src/services/clienteService.ts`, mantendo este contrato de dados e,
 * portanto, sem exigir mudanças em componentes ou páginas.
 */

export type ClienteStatus = 'ativo' | 'inativo'

export const CLIENTE_STATUS_LABEL: Record<ClienteStatus, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
}

/** Aba 1 — Dados da Empresa */
export interface ClienteDadosEmpresa {
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  segmento: string
  inscricaoEstadual: string
  site: string
}

/** Aba 2 — Endereço (preparado para autocompletar via ViaCEP) */
export interface ClienteEndereco {
  cep: string
  endereco: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
}

/** Aba 3 — Contato */
export interface ClienteContato {
  responsavel: string
  cargo: string
  whatsapp: string
  telefone: string
  email: string
}

/** Aba 4 — Acesso ao sistema.
 *  `senhaTemporaria`/`confirmarSenha` só existem no formulário (nunca são
 *  devolvidos pelo service em listagens/leitura) — na integração com
 *  Supabase Auth, esses dois campos deixam de existir aqui e passam a ser
 *  usados apenas para chamar supabase.auth.admin.createUser /
 *  updateUserById no momento do envio do formulário. */
export interface ClienteAcesso {
  emailLogin: string
  status: ClienteStatus
  forcarTrocaSenha: boolean
}

export interface Cliente {
  id: string
  empresa: ClienteDadosEmpresa
  endereco: ClienteEndereco
  contato: ClienteContato
  acesso: ClienteAcesso
  observacoes: string
  criadoEm: string
  atualizadoEm: string
}

/** Formato usado pelo formulário de criação/edição — inclui os campos de
 *  senha (aba "Acesso ao Sistema") que não fazem parte do registro salvo. */
export interface ClienteFormData {
  empresa: ClienteDadosEmpresa
  endereco: ClienteEndereco
  contato: ClienteContato
  acesso: ClienteAcesso
  senhaTemporaria: string
  confirmarSenha: string
  observacoes: string
}

export function criarClienteFormVazio(): ClienteFormData {
  return {
    empresa: {
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      segmento: '',
      inscricaoEstadual: '',
      site: '',
    },
    endereco: {
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    contato: {
      responsavel: '',
      cargo: '',
      whatsapp: '',
      telefone: '',
      email: '',
    },
    acesso: {
      emailLogin: '',
      status: 'ativo',
      forcarTrocaSenha: true,
    },
    senhaTemporaria: '',
    confirmarSenha: '',
    observacoes: '',
  }
}

export function clienteParaFormData(cliente: Cliente): ClienteFormData {
  return {
    empresa: { ...cliente.empresa },
    endereco: { ...cliente.endereco },
    contato: { ...cliente.contato },
    acesso: { ...cliente.acesso },
    senhaTemporaria: '',
    confirmarSenha: '',
    observacoes: cliente.observacoes,
  }
}

export const SEGMENTOS_DISPONIVEIS = [
  'Administração Pública',
  'Construção Civil',
  'Saúde',
  'Educação',
  'Tecnologia da Informação',
  'Alimentação',
  'Serviços Gerais',
  'Outro',
]

export const ESTADOS_BRASILEIROS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
]
