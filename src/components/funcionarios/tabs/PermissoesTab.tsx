import type { FuncionarioPermissoes } from '@/types/funcionario'
import { MOCK_CLIENTES } from '@/data/mockClientes'
import { MOCK_LICITACOES_RESUMO } from '@/data/mockLicitacoesResumo'

interface PermissoesTabProps {
  permissoes: FuncionarioPermissoes
  onChange: (patch: Partial<FuncionarioPermissoes>) => void
}

function alternarItem(lista: string[], id: string): string[] {
  return lista.includes(id) ? lista.filter((item) => item !== id) : [...lista, id]
}

/** Aba 4 — vínculos hoje são simples (ids de clientes/licitações). A seção
 *  "Permissões futuras" já está no layout, mas desabilitada, para deixar
 *  clara a extensão prevista (permissões granulares por módulo/ação) sem
 *  implementá-la ainda. */
export function PermissoesTab({ permissoes, onChange }: PermissoesTabProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Clientes vinculados</p>
        <div className="mt-2 max-h-56 space-y-1 overflow-y-auto rounded-lg border border-ink-soft/15 p-2">
          {MOCK_CLIENTES.map((cliente) => (
            <label
              key={cliente.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-forest-mist/40"
            >
              <input
                type="checkbox"
                checked={permissoes.clientesVinculados.includes(cliente.id)}
                onChange={() =>
                  onChange({
                    clientesVinculados: alternarItem(permissoes.clientesVinculados, cliente.id),
                  })
                }
                className="h-4 w-4 rounded border-ink-soft/40 text-forest focus:ring-forest-mist"
              />
              <span className="font-body text-sm text-ink">{cliente.empresa.nomeFantasia}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Licitações atribuídas</p>
        <div className="mt-2 max-h-56 space-y-1 overflow-y-auto rounded-lg border border-ink-soft/15 p-2">
          {MOCK_LICITACOES_RESUMO.map((licitacao) => (
            <label
              key={licitacao.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-forest-mist/40"
            >
              <input
                type="checkbox"
                checked={permissoes.licitacoesAtribuidas.includes(licitacao.id)}
                onChange={() =>
                  onChange({
                    licitacoesAtribuidas: alternarItem(permissoes.licitacoesAtribuidas, licitacao.id),
                  })
                }
                className="h-4 w-4 rounded border-ink-soft/40 text-forest focus:ring-forest-mist"
              />
              <span className="font-body text-sm text-ink">{licitacao.titulo}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-ink-soft/25 bg-paper-2/60 p-4 sm:col-span-2">
        <p className="font-body text-sm font-medium text-ink-soft">
          Permissões futuras <span className="font-mono text-[11px] uppercase">(em breve)</span>
        </p>
        <p className="mt-1 font-body text-xs text-ink-soft">
          Estrutura preparada para permissões granulares por módulo e ação (ex.: visualizar,
          criar, editar, excluir em Clientes, Licitações, Relatórios). Hoje o acesso é definido
          apenas pelo Perfil (aba "Acesso ao Sistema").
        </p>
      </div>
    </div>
  )
}
