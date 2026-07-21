import type { ReactNode } from 'react'
import { Header } from '@/components/Header'

interface DashboardShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/** Estrutura compartilhada pelos três dashboards (admin, funcionário, cliente),
 *  para manter consistência visual e evitar repetição de markup. */
export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-semibold text-forest-deep">{title}</h1>
          {subtitle && <p className="mt-1 font-body text-sm text-ink-soft">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  hint?: string
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-ink-soft/10 bg-white p-5 shadow-soft">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-forest-deep">{value}</p>
      {hint && <p className="mt-1 font-body text-xs text-ink-soft">{hint}</p>}
    </div>
  )
}
