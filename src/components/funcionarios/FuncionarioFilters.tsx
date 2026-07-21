import type { FuncionarioStatus } from '@/types/funcionario'
import { Button } from '@/components/Button'

interface FuncionarioFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: FuncionarioStatus | 'todos'
  onStatusChange: (value: FuncionarioStatus | 'todos') => void
  onNovoFuncionario: () => void
}

const STATUS_OPTIONS: Array<{ value: FuncionarioStatus | 'todos'; label: string }> = [
  { value: 'todos', label: 'Todos os status' },
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
]

/** Barra de busca + filtro de status + botão "novo funcionário" acima da
 *  tabela. Segue exatamente o mesmo padrão de ClienteFilters. */
export function FuncionarioFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onNovoFuncionario,
}: FuncionarioFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nome, e-mail ou cargo"
            aria-label="Buscar funcionários"
            className="w-full rounded-lg border border-ink-soft/25 px-3.5 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest-mist"
          />
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as FuncionarioStatus | 'todos')}
          aria-label="Filtrar por status"
          className="rounded-lg border border-ink-soft/25 bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest-mist"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Button variant="primary" onClick={onNovoFuncionario}>
        + Novo Funcionário
      </Button>
    </div>
  )
}
