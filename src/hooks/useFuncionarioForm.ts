import { useState } from 'react'
import type {
  FuncionarioAcesso,
  FuncionarioCargo,
  FuncionarioDadosPessoais,
  FuncionarioFormData,
  FuncionarioPermissoes,
} from '@/types/funcionario'
import { criarFuncionarioFormVazio } from '@/types/funcionario'
import { isValidCPF, isValidEmail } from '@/utils/validators'
import { funcionarioService } from '@/services/funcionarioService'

export type FuncionarioFormErrors = Partial<
  Record<
    | keyof FuncionarioDadosPessoais
    | keyof FuncionarioCargo
    | 'emailLogin'
    | 'senhaTemporaria'
    | 'confirmarSenha',
    string
  >
>

interface UseFuncionarioFormOptions {
  /** id do funcionário em edição, para não acusar "e-mail duplicado" contra ele mesmo. */
  funcionarioIdEmEdicao?: string
  /** true ao editar: torna a senha temporária opcional (só preenche se for resetar). */
  isEdicao?: boolean
}

/** Estado + validação do formulário de funcionário, compartilhado pelas 5 abas.
 *  Segue exatamente o mesmo padrão de src/hooks/useClienteForm.ts. */
export function useFuncionarioForm(
  initialData: FuncionarioFormData | undefined,
  options: UseFuncionarioFormOptions = {}
) {
  const [formData, setFormData] = useState<FuncionarioFormData>(
    initialData ?? criarFuncionarioFormVazio()
  )
  const [errors, setErrors] = useState<FuncionarioFormErrors>({})

  function updatePessoal(patch: Partial<FuncionarioDadosPessoais>) {
    setFormData((prev) => ({ ...prev, pessoal: { ...prev.pessoal, ...patch } }))
  }

  function updateCargo(patch: Partial<FuncionarioCargo>) {
    setFormData((prev) => ({ ...prev, cargo: { ...prev.cargo, ...patch } }))
  }

  function updateAcesso(patch: Partial<FuncionarioAcesso>) {
    setFormData((prev) => ({ ...prev, acesso: { ...prev.acesso, ...patch } }))
  }

  function updateSenha(patch: Partial<Pick<FuncionarioFormData, 'senhaTemporaria' | 'confirmarSenha'>>) {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  function updatePermissoes(patch: Partial<FuncionarioPermissoes>) {
    setFormData((prev) => ({ ...prev, permissoes: { ...prev.permissoes, ...patch } }))
  }

  function updateObservacoesAdministrativas(observacoesAdministrativas: string) {
    setFormData((prev) => ({ ...prev, observacoesAdministrativas }))
  }

  function clearError(campo: keyof FuncionarioFormErrors) {
    setErrors((prev) => {
      if (!prev[campo]) return prev
      const next = { ...prev }
      delete next[campo]
      return next
    })
  }

  /** Valida as abas com campos obrigatórios (Dados Pessoais, Cargo, Acesso).
   *  Permissões e Histórico não têm campos obrigatórios. */
  async function validar(): Promise<boolean> {
    const novosErros: FuncionarioFormErrors = {}

    // Aba 1 — Dados Pessoais
    if (!formData.pessoal.nomeCompleto.trim()) novosErros.nomeCompleto = 'Campo obrigatório.'
    if (!formData.pessoal.cpf.trim()) {
      novosErros.cpf = 'Campo obrigatório.'
    } else if (!isValidCPF(formData.pessoal.cpf)) {
      novosErros.cpf = 'CPF inválido.'
    }
    if (!formData.pessoal.dataNascimento.trim()) novosErros.dataNascimento = 'Campo obrigatório.'
    if (!formData.pessoal.whatsapp.trim()) novosErros.whatsapp = 'Campo obrigatório.'
    if (!formData.pessoal.email.trim()) {
      novosErros.email = 'Campo obrigatório.'
    } else if (!isValidEmail(formData.pessoal.email)) {
      novosErros.email = 'E-mail inválido.'
    }

    // Aba 2 — Cargo
    if (!formData.cargo.cargo.trim()) novosErros.cargo = 'Campo obrigatório.'
    if (!formData.cargo.departamento.trim()) novosErros.departamento = 'Campo obrigatório.'
    if (!formData.cargo.dataAdmissao.trim()) novosErros.dataAdmissao = 'Campo obrigatório.'

    // Aba 3 — Acesso ao Sistema
    if (!formData.acesso.emailLogin.trim()) {
      novosErros.emailLogin = 'Campo obrigatório.'
    } else if (!isValidEmail(formData.acesso.emailLogin)) {
      novosErros.emailLogin = 'E-mail inválido.'
    } else {
      const duplicado = await funcionarioService.emailLoginJaCadastrado(
        formData.acesso.emailLogin,
        options.funcionarioIdEmEdicao
      )
      if (duplicado) novosErros.emailLogin = 'Já existe um funcionário com este e-mail de login.'
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
    updatePessoal,
    updateCargo,
    updateAcesso,
    updateSenha,
    updatePermissoes,
    updateObservacoesAdministrativas,
    clearError,
    validar,
  }
}
