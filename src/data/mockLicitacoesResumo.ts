/**
 * Lista resumida e mockada de licitações, usada apenas para popular a
 * seleção de "Licitações atribuídas" na Aba 4 (Permissões) do módulo de
 * Funcionários. O módulo de Licitações completo ainda não existe no
 * sistema — quando for implementado, este arquivo é substituído por uma
 * consulta real (`licitacaoService.list()` ou equivalente no Supabase).
 */
export interface LicitacaoResumo {
  id: string
  titulo: string
}

export const MOCK_LICITACOES_RESUMO: LicitacaoResumo[] = [
  { id: 'lic-0009', titulo: 'Pregão Eletrônico 009/2025 — Fornecimento de EPIs' },
  { id: 'lic-0012', titulo: 'Concorrência 012/2025 — Reforma de unidade de saúde' },
  { id: 'lic-0018', titulo: 'Pregão Eletrônico 018/2025 — Merenda escolar' },
  { id: 'lic-0021', titulo: 'Tomada de Preços 021/2025 — Serviços de limpeza' },
]
