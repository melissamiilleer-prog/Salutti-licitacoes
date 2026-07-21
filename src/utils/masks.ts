import { somenteDigitos } from '@/utils/validators'

/** Máscaras simples aplicadas a valores de input (onChange), sem libs externas. */

export function maskCPF(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 11)
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})(\d{2})$/, '$1-$2')
}

export function maskCNPJ(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function maskCEP(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 8)
  return d.replace(/^(\d{5})(\d)/, '$1-$2')
}

export function maskTelefone(valor: string): string {
  const d = somenteDigitos(valor).slice(0, 11)
  if (d.length <= 10) {
    return d.replace(/^(\d{2})(\d{4})(\d{0,4})/, (_m, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : `(${a}`
    )
  }
  return d.replace(/^(\d{2})(\d{5})(\d{0,4})/, (_m, a, b, c) =>
    c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : `(${a}`
  )
}
