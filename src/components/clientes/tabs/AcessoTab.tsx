import type { ClienteAcesso, ClienteStatus } from '@/types/cliente'
import { TextField } from '@/components/TextField'
import { SelectField } from '@/components/SelectField'
import { CheckboxField } from '@/components/CheckboxField'
import type { ClienteFormErrors } from '@/hooks/useClienteForm'

interface AcessoTabProps {
  acesso: ClienteAcesso
  senhaTemporaria: string
  confirmarSenha: string
  errors: ClienteFormErrors
  isEdicao: boolean
  onChangeAcesso: (patch: Partial<ClienteAcesso>) => void
  onChangeSenha: (patch: Partial<{ senhaTemporaria: string; confirmarSenha: string }>) => void
  onClearError: (campo: keyof ClienteFormErrors) => void
}

const STATUS_OPTIONS: Array<{ value: ClienteStatus; label: string }> = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
]

export function AcessoTab({
  acesso,
  senhaTemporaria,
  confirmarSenha,
  errors,
  isEdicao,
  onChangeAcesso,
  onChangeSenha,
  onClearError,
}: AcessoTabProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        label="E-mail de login *"
        type="email"
        value={acesso.emailLogin}
        error={errors.emailLogin}
        onChange={(e) => {
          onChangeAcesso({ emailLogin: e.target.value })
          onClearError('emailLogin')
        }}
        className="sm:col-span-2"
      />

      <TextField
        label={isEdicao ? 'Nova senha (deixe em branco para manter a atual)' : 'Senha temporária *'}
        type="password"
        value={senhaTemporaria}
        error={errors.senhaTemporaria}
        onChange={(e) => {
          onChangeSenha({ senhaTemporaria: e.target.value })
          onClearError('senhaTemporaria')
        }}
      />
      <TextField
        label="Confirmar senha *"
        type="password"
        value={confirmarSenha}
        error={errors.confirmarSenha}
        onChange={(e) => {
          onChangeSenha({ confirmarSenha: e.target.value })
          onClearError('confirmarSenha')
        }}
      />

      <SelectField
        label="Status *"
        value={acesso.status}
        options={STATUS_OPTIONS}
        onChange={(e) => onChangeAcesso({ status: e.target.value as ClienteStatus })}
      />

      <div className="flex items-end sm:col-span-2">
        <CheckboxField
          label="Obrigar troca de senha no primeiro acesso"
          description="O cliente deverá definir uma nova senha ao entrar pela primeira vez."
          checked={acesso.forcarTrocaSenha}
          onChange={(e) => onChangeAcesso({ forcarTrocaSenha: e.target.checked })}
        />
      </div>
    </div>
  )
}
