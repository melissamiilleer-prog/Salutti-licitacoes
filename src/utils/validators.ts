/** Validadores usados no formulário de clientes (sem dependências externas). */

/** Remove tudo que não for dígito. */
export function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, '')
}

/** Valida CPF pelo algoritmo oficial de dígitos verificadores. */
export function isValidCPF(valor: string): boolean {
  const cpf = somenteDigitos(valor)
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false // todos os dígitos iguais

  function calcularDigito(base: string, pesoInicial: number): number {
    const soma = base
      .split('')
      .reduce((acc, digito, i) => acc + Number(digito) * (pesoInicial - i), 0)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  const digito1 = calcularDigito(cpf.slice(0, 9), 10)
  const digito2 = calcularDigito(cpf.slice(0, 9) + digito1, 11)

  return cpf === cpf.slice(0, 9) + String(digito1) + String(digito2)
}

/** Valida CNPJ pelo algoritmo oficial de dígitos verificadores. */
export function isValidCNPJ(valor: string): boolean {
  const cnpj = somenteDigitos(valor)
  if (cnpj.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpj)) return false // todos os dígitos iguais

  function calcularDigito(base: string, pesos: number[]): number {
    const soma = base
      .split('')
      .reduce((acc, digito, i) => acc + Number(digito) * pesos[i], 0)
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const digito1 = calcularDigito(cnpj.slice(0, 12), pesos1)
  const digito2 = calcularDigito(cnpj.slice(0, 12) + digito1, pesos2)

  return cnpj === cnpj.slice(0, 12) + String(digito1) + String(digito2)
}

/** Validação de e-mail suficiente para formulário (não substitui verificação real de envio). */
export function isValidEmail(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
}

export function isValidCEP(valor: string): boolean {
  return somenteDigitos(valor).length === 8
}
