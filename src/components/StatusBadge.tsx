/** Status Ativo/Inativo — tipo local para manter este componente desacoplado
 *  de qualquer módulo específico (Clientes, Funcionários, etc). ClienteStatus
 *  e FuncionarioStatus são estruturalmente iguais a este tipo. */
export type BadgeStatus = 'ativo' | 'inativo'

const STATUS_LABEL: Record<BadgeStatus, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
}

const TONE_CLASSES: Record<BadgeStatus, string> = {
  ativo: 'bg-forest-mist text-forest-deep',
  inativo: 'bg-ink-soft/10 text-ink-soft',
}

/** Selo de status Ativo/Inativo — reutilizável em qualquer listagem do sistema
 *  (usado hoje em Clientes e Funcionários). */
export function StatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${TONE_CLASSES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
