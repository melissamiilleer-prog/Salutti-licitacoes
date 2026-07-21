import type { FuncionarioDadosPessoais } from '@/types/funcionario'
import { TextField } from '@/components/TextField'
import { maskCPF, maskTelefone } from '@/utils/masks'
import type { FuncionarioFormErrors } from '@/hooks/useFuncionarioForm'

interface DadosPessoaisTabProps {
  pessoal: FuncionarioDadosPessoais
  errors: FuncionarioFormErrors
  onChange: (patch: Partial<FuncionarioDadosPessoais>) => void
  onClearError: (campo: keyof FuncionarioFormErrors) => void
}

export function DadosPessoaisTab({ pessoal, errors, onChange, onClearError }: DadosPessoaisTabProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        label="Nome completo *"
        value={pessoal.nomeCompleto}
        error={errors.nomeCompleto}
        onChange={(e) => {
          onChange({ nomeCompleto: e.target.value })
          onClearError('nomeCompleto')
        }}
        className="sm:col-span-2"
      />
      <TextField
        label="CPF *"
        value={pessoal.cpf}
        error={errors.cpf}
        placeholder="000.000.000-00"
        onChange={(e) => {
          onChange({ cpf: maskCPF(e.target.value) })
          onClearError('cpf')
        }}
      />
      <TextField
        label="Data de nascimento *"
        type="date"
        value={pessoal.dataNascimento}
        error={errors.dataNascimento}
        onChange={(e) => {
          onChange({ dataNascimento: e.target.value })
          onClearError('dataNascimento')
        }}
      />
      <TextField
        label="Telefone"
        value={pessoal.telefone}
        placeholder="(00) 0000-0000"
        onChange={(e) => onChange({ telefone: maskTelefone(e.target.value) })}
      />
      <TextField
        label="WhatsApp *"
        value={pessoal.whatsapp}
        error={errors.whatsapp}
        placeholder="(00) 00000-0000"
        onChange={(e) => {
          onChange({ whatsapp: maskTelefone(e.target.value) })
          onClearError('whatsapp')
        }}
      />
      <TextField
        label="E-mail *"
        type="email"
        value={pessoal.email}
        error={errors.email}
        onChange={(e) => {
          onChange({ email: e.target.value })
          onClearError('email')
        }}
        className="sm:col-span-2"
      />
    </div>
  )
}
