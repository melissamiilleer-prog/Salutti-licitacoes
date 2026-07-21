import type { ClienteContato } from '@/types/cliente'
import { TextField } from '@/components/TextField'
import { maskTelefone } from '@/utils/masks'
import type { ClienteFormErrors } from '@/hooks/useClienteForm'

interface ContatoTabProps {
  contato: ClienteContato
  errors: ClienteFormErrors
  onChange: (patch: Partial<ClienteContato>) => void
  onClearError: (campo: keyof ClienteFormErrors) => void
}

export function ContatoTab({ contato, errors, onChange, onClearError }: ContatoTabProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        label="Responsável *"
        value={contato.responsavel}
        error={errors.responsavel}
        onChange={(e) => {
          onChange({ responsavel: e.target.value })
          onClearError('responsavel')
        }}
      />
      <TextField
        label="Cargo/Função *"
        value={contato.cargo}
        error={errors.cargo}
        onChange={(e) => {
          onChange({ cargo: e.target.value })
          onClearError('cargo')
        }}
      />
      <TextField
        label="WhatsApp *"
        value={contato.whatsapp}
        error={errors.whatsapp}
        placeholder="(00) 00000-0000"
        onChange={(e) => {
          onChange({ whatsapp: maskTelefone(e.target.value) })
          onClearError('whatsapp')
        }}
      />
      <TextField
        label="Telefone"
        value={contato.telefone}
        placeholder="(00) 0000-0000"
        onChange={(e) => onChange({ telefone: maskTelefone(e.target.value) })}
      />
      <TextField
        label="E-mail *"
        type="email"
        value={contato.email}
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
