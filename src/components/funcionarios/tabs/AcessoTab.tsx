import type { FuncionarioAcesso, FuncionarioPerfil, FuncionarioStatus } from '@/types/funcionario'
import { TextField } from '@/components/TextField'
import { SelectField } from '@/components/SelectField'
import { CheckboxField } from '@/components/CheckboxField'
import type { FuncionarioFormErrors } from '@/hooks/useFuncionarioForm'

interface AcessoTabProps {
  acesso: FuncionarioAcesso
  senhaTemporaria: string
  confirmarSenha: string
  errors: FuncionarioFormErrors
  isEdicao: boolean
  onChangeAcesso: (patch: Partial<FuncionarioAcesso>) => void
  onChangeSenha: (patch: Partial<{ senhaTemporaria: string; confirmarSenha: string }>) => void
  onClearError: (campo: keyof FuncionarioFormErrors) => void
}

const PERFIL_OPTIONS: Array<{ value: FuncionarioPerfil; label: string }> = [
  { value: 'admin', label: 'Administrador' },
  { value: 'funcionario', label: 'Funcionário' },
]

const STATUS_OPTIONS: Array<{ value: FuncionarioStatus; label: string }> = [
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
        label="Perfil *"
        value={acesso.perfil}
        options={PERFIL_OPTIONS}
        onChange={(e) => onChangeAcesso({ perfil: e.target.value as FuncionarioPerfil })}
      />
      <SelectField
        label="Status *"
        value={acesso.status}
        options={STATUS_OPTIONS}
        onChange={(e) => onChangeAcesso({ status: e.target.value as FuncionarioStatus })}
      />

      <div className="flex items-end sm:col-span-2">
        <CheckboxField
          label="Obrigar troca de senha no primeiro acesso"
          description="O funcionário deverá definir uma nova senha ao entrar pela primeira vez."
          checked={acesso.forcarTrocaSenha}
          onChange={(e) => onChangeAcesso({ forcarTrocaSenha: e.target.checked })}
        />
      </div>
    </div>
  )
}
