import { TextAreaField } from '@/components/TextAreaField'

interface ObservacoesTabProps {
  observacoes: string
  onChange: (value: string) => void
}

export function ObservacoesTab({ observacoes, onChange }: ObservacoesTabProps) {
  return (
    <TextAreaField
      label="Observações"
      value={observacoes}
      placeholder="Anotações internas sobre o cliente (não visíveis para ele)."
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
