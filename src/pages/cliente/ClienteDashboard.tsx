import { DashboardShell, StatCard } from '@/components/DashboardShell'
import { useAuth } from '@/context/AuthContext'

export function ClienteDashboard() {
  const { user } = useAuth()

  return (
    <DashboardShell
      title={`Bem-vindo, ${user?.name ?? 'Cliente'}`}
      subtitle="Acompanhamento das suas licitações — dados de exemplo, prontos para conectar a dados reais."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Licitações acompanhadas" value="6" />
        <StatCard label="Propostas enviadas" value="4" />
        <StatCard label="Contratos ativos" value="2" />
      </div>

      <div className="mt-8 rounded-xl border border-ink-soft/10 bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-forest-deep">Área do cliente</h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Aqui entrarão, nas próximas etapas: status detalhado de cada
          licitação, documentos compartilhados pela Salutti e canal de
          mensagens. Esta tela é exclusiva do perfil <strong>Cliente</strong>.
        </p>
      </div>
    </DashboardShell>
  )
}
