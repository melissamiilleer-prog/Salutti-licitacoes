import { somenteDigitos } from '@/utils/validators'

/**
 * Integração com a API pública ViaCEP (https://viacep.com.br), usada na
 * Aba 2 (Endereço) do formulário de clientes para autocompletar
 * endereço/bairro/cidade/estado a partir do CEP digitado.
 *
 * Diferente do restante do módulo, esta é uma API externa e sem custo,
 * então já está implementada de verdade (não é mock) — não depende do
 * Supabase e pode continuar sendo usada mesmo após aquela integração.
 */

export interface ViaCepEndereco {
  cep: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
}

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export const viaCepService = {
  async buscarEnderecoPorCep(cep: string): Promise<ViaCepEndereco | null> {
    const digitos = somenteDigitos(cep)
    if (digitos.length !== 8) return null

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`)
      if (!resposta.ok) return null

      const dados: ViaCepResponse = await resposta.json()
      if (dados.erro) return null

      return {
        cep: digitos,
        endereco: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    } catch {
      // Falha de rede/CEP inválido: o usuário preenche o endereço manualmente.
      return null
    }
  },
}
