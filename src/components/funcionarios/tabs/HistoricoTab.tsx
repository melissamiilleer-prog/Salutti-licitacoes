import type { FuncionarioHistoricoEntrada } from '@/types/funcionario'
import { TextAreaField } from '@/components/TextAreaField'

interface HistoricoTabProps {
  observacoesAdministrativas: string
  historico: FuncionarioHistoricoEntrada[]
  onChange: (value: string) => void
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Aba 5 — observações administrativas (editáveis) + registro de alterações
 *  (somente leitura, mockado; futuramente viria de uma tabela de auditoria). */
export function HistoricoTab({ observacoesAdministrativas, historico, onChange }: HistoricoTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <TextAreaField
        label="Observações administrativas"
        value={observacoesAdministrativas}
        placeholder="Anotações internas sobre o funcionário (não visíveis para ele)."
        onChange={(e) => onChange(e.target.value)}
      />

      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">Registro de alterações</p>
        {historico.length === 0 ? (
          <p className="mt-2 font-body text-sm text-ink-soft">Nenhuma alteração registrada ainda.</p>
        ) : (
          <ol className="mt-2 space-y-3 border-l-2 border-forest-mist pl-4">
            {[...historico].reverse().map((entrada) => (
              <li key={entrada.id}>
                <p className="font-body text-sm text-ink">{entrada.descricao}</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  {formatarData(entrada.data)} · {entrada.autor}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
