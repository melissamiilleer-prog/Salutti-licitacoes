import { useState } from 'react'
import type {
  ClienteAcesso,
  ClienteContato,
  ClienteDadosEmpresa,
  ClienteEndereco,
  ClienteFormData,
} from '@/types/cliente'
import { criarClienteFormVazio } from '@/types/cliente'
import { isValidCEP, isValidCNPJ, isValidEmail } from '@/utils/validators'
import { clienteService } from '@/services/clienteService'

export type ClienteFormErrors = Partial<
  Record<
    | keyof ClienteDadosEmpresa
    | keyof ClienteEndereco
    | keyof ClienteContato
    | 'emailLogin'
    | 'senhaTemporaria'
    | 'confirmarSenha',
    string
  >
>

interface UseClienteFormOptions {
  /** id do cliente em edição, para não acusar "CNPJ duplicado" contra ele mesmo. */
  clienteIdEmEdicao?: string
  /** true ao editar: torna a senha temporária opcional (só preenche se for resetar). */
  isEdicao?: boolean
}

/** Estado + validação do formulário de cliente, compartilhado pelas 5 abas. */
export function useClienteForm(
  initialData: ClienteFormData | undefined,
  options: UseClienteFormOptions = {}
) {
  const [formData, setFormData] = useState<ClienteFormData>(
    initialData ?? criarClienteFormVazio()
  )
  const [errors, setErrors] = useState<ClienteFormErrors>({})

  function updateEmpresa(patch: Partial<ClienteDadosEmpresa>) {
    setFormData((prev) => ({ ...prev, empresa: { ...prev.empresa, ...patch } }))
  }

  function updateEndereco(patch: Partial<ClienteEndereco>) {
    setFormData((prev) => ({ ...prev, endereco: { ...prev.endereco, ...patch } }))
  }

  function updateContato(patch: Partial<ClienteContato>) {
    setFormData((prev) => ({ ...prev, contato: { ...prev.contato, ...patch } }))
  }

  function updateAcesso(patch: Partial<ClienteAcesso>) {
    setFormData((prev) => ({ ...prev, acesso: { ...prev.acesso, ...patch } }))
  }

  function updateSenha(patch: Partial<Pick<ClienteFormData, 'senhaTemporaria' | 'confirmarSenha'>>) {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  function updateObservacoes(observacoes: string) {
    setFormData((prev) => ({ ...prev, observacoes }))
  }

  function clearError(campo: keyof ClienteFormErrors) {
    setErrors((prev) => {
      if (!prev[campo]) return prev
      const next = { ...prev }
      delete next[campo]
      return next
    })
  }

  /** Valida todas as abas. Retorna true se tudo estiver ok; caso contrário,
   *  preenche `errors` (usado pelas abas para destacar os campos). */
  async function validar(): Promise<boolean> {
    const novosErros: ClienteFormErrors = {}

    // Aba 1 — Dados da Empresa
    if (!formData.empresa.razaoSocial.trim()) novosErros.razaoSocial = 'Campo obrigatório.'
    if (!formData.empresa.nomeFantasia.trim()) novosErros.nomeFantasia = 'Campo obrigatório.'
    if (!formData.empresa.segmento.trim()) novosErros.segmento = 'Campo obrigatório.'
    if (!formData.empresa.cnpj.trim()) {
      novosErros.cnpj = 'Campo obrigatório.'
    } else if (!isValidCNPJ(formData.empresa.cnpj)) {
      novosErros.cnpj = 'CNPJ inválido.'
    } else {
      const duplicado = await clienteService.cnpjJaCadastrado(
        formData.empresa.cnpj,
        options.clienteIdEmEdicao
      )
      if (duplicado) novosErros.cnpj = 'Já existe um cliente com este CNPJ.'
    }

    // Aba 2 — Endereço
    if (!formData.endereco.cep.trim()) {
      novosErros.cep = 'Campo obrigatório.'
    } else if (!isValidCEP(formData.endereco.cep)) {
      novosErros.cep = 'CEP inválido.'
    }
    if (!formData.endereco.endereco.trim()) novosErros.endereco = 'Campo obrigatório.'
    if (!formData.endereco.numero.trim()) novosErros.numero = 'Campo obrigatório.'
    if (!formData.endereco.bairro.trim()) novosErros.bairro = 'Campo obrigatório.'
    if (!formData.endereco.cidade.trim()) novosErros.cidade = 'Campo obrigatório.'
    if (!formData.endereco.estado.trim()) novosErros.estado = 'Campo obrigatório.'

    // Aba 3 — Contato
    if (!formData.contato.responsavel.trim()) novosErros.responsavel = 'Campo obrigatório.'
    if (!formData.contato.cargo.trim()) novosErros.cargo = 'Campo obrigatório.'
    if (!formData.contato.whatsapp.trim()) novosErros.whatsapp = 'Campo obrigatório.'
    if (!formData.contato.email.trim()) {
      novosErros.email = 'Campo obrigatório.'
    } else if (!isValidEmail(formData.contato.email)) {
      novosErros.email = 'E-mail inválido.'
    }

    // Aba 4 — Acesso ao Sistema
    if (!formData.acesso.emailLogin.trim()) {
      novosErros.emailLogin = 'Campo obrigatório.'
    } else if (!isValidEmail(formData.acesso.emailLogin)) {
      novosErros.emailLogin = 'E-mail inválido.'
    }

    const senhaObrigatoria = !options.isEdicao
    if (senhaObrigatoria || formData.senhaTemporaria || formData.confirmarSenha) {
      if (!formData.senhaTemporaria) {
        novosErros.senhaTemporaria = 'Campo obrigatório.'
      } else if (formData.senhaTemporaria.length < 6) {
        novosErros.senhaTemporaria = 'Mínimo de 6 caracteres.'
      }
      if (formData.confirmarSenha !== formData.senhaTemporaria) {
        novosErros.confirmarSenha = 'As senhas não coincidem.'
      }
    }

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  return {
    formData,
    errors,
    updateEmpresa,
    updateEndereco,
    updateContato,
    updateAcesso,
    updateSenha,
    updateObservacoes,
    clearError,
    validar,
  }
}
