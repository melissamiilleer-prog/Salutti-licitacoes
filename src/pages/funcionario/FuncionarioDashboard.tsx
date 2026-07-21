import { DashboardShell, StatCard } from '@/components/DashboardShell'
import { useAuth } from '@/context/AuthContext'

export function FuncionarioDashboard() {
  const { user } = useAuth()

  return (
    <DashboardShell
      title={`Olá, ${user?.name ?? 'Funcionário'}`}
      subtitle="Seus processos e tarefas — dados de exemplo, prontos para conectar a dados reais."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Processos sob sua análise" value="9" />
        <StatCard label="Prazos esta semana" value="4" hint="2 vencem em 48h" />
        <StatCard label="Clientes atendidos no mês" value="12" />
      </div>

      <div className="mt-8 rounded-xl border border-ink-soft/10 bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-forest-deep">
          Área do funcionário
        </h2>
        <p className="mt-2 font-body text-sm text-ink-soft">
          Aqui entrarão, nas próximas etapas: lista de processos atribuídos,
          upload de documentos e comunicação com clientes. Esta tela é
          exclusiva do perfil <strong>Funcionário</strong>.
        </p>
      </div>
    </DashboardShell>
  )
}
