export interface TabItem {
  id: string
  label: string
  /** Mostra um indicador de erro na aba (ex.: campos obrigatórios pendentes). */
  hasError?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
}

/** Navegação por abas genérica — usada no formulário de clientes (5 abas),
 *  reutilizável em qualquer outra tela com conteúdo segmentado. */
export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1 border-b border-ink-soft/10">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative rounded-t-lg px-4 py-2.5 font-body text-sm font-medium transition-colors ${
              isActive
                ? 'bg-forest-mist text-forest-deep'
                : 'text-ink-soft hover:bg-forest-mist/50 hover:text-forest-deep'
            }`}
          >
            {tab.label}
            {tab.hasError && (
              <span
                aria-label="Aba com campos pendentes"
                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-red-500 align-middle"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
