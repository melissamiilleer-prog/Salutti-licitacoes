import type { Funcionario } from '@/types/funcionario'
import { FUNCIONARIO_PERFIL_LABEL } from '@/types/funcionario'
import { StatusBadge } from '@/components/StatusBadge'

interface FuncionarioTableProps {
  funcionarios: Funcionario[]
  isLoading: boolean
  onEdit: (funcionario: Funcionario) => void
  onDelete: (funcionario: Funcionario) => void
}

/** Segue exatamente o mesmo padrão de ClienteTable. */
export function FuncionarioTable({ funcionarios, isLoading, onEdit, onDelete }: FuncionarioTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="font-body text-sm text-ink-soft">Carregando funcionários…</p>
      </div>
    )
  }

  if (funcionarios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
        <p className="font-body text-sm font-medium text-ink">Nenhum funcionário encontrado.</p>
        <p className="font-body text-xs text-ink-soft">
          Ajuste a busca ou o filtro de status, ou cadastre um novo funcionário.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-ink-soft/10">
            <th className="whitespace-nowrap px-3 py-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Nome
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              E-mail
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Cargo
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Perfil
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Status
            </th>
            <th className="whitespace-nowrap px-3 py-3 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr
              key={funcionario.id}
              className="border-b border-ink-soft/5 last:border-0 hover:bg-forest-mist/20"
            >
              <td className="px-3 py-3 font-body text-sm font-medium text-ink">
                {funcionario.pessoal.nomeCompleto}
              </td>
              <td className="px-3 py-3 font-body text-sm text-ink-soft">
                {funcionario.pessoal.email}
              </td>
              <td className="px-3 py-3 font-body text-sm text-ink-soft">{funcionario.cargo.cargo}</td>
              <td className="px-3 py-3 font-mono text-xs text-ink-soft">
                {FUNCIONARIO_PERFIL_LABEL[funcionario.acesso.perfil]}
              </td>
              <td className="px-3 py-3">
                <StatusBadge status={funcionario.acesso.status} />
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(funcionario)}
                    className="font-body text-sm font-medium text-forest-deep hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(funcionario)}
                    className="font-body text-sm font-medium text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
