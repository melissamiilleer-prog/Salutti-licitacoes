import type { ClienteStatus } from '@/types/cliente'
import { Button } from '@/components/Button'

interface ClienteFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: ClienteStatus | 'todos'
  onStatusChange: (value: ClienteStatus | 'todos') => void
  onNovoCliente: () => void
}

const STATUS_OPTIONS: Array<{ value: ClienteStatus | 'todos'; label: string }> = [
  { value: 'todos', label: 'Todos os status' },
  { value: 'ativo', label: 'Ativo' },
  { value: 'inativo', label: 'Inativo' },
]

/** Barra de busca + filtro de status + botão "novo cliente" acima da tabela. */
export function ClienteFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onNovoCliente,
}: ClienteFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <div className="relative flex-1 sm:max-w-xs">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por razão social, nome fantasia ou CNPJ"
            aria-label="Buscar clientes"
            className="w-full rounded-lg border border-ink-soft/25 px-3.5 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest-mist"
          />
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as ClienteStatus | 'todos')}
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

      <Button variant="primary" onClick={onNovoCliente}>
        + Novo Cliente
      </Button>
    </div>
  )
}
