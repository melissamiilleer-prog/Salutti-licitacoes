import { useEffect, useState } from 'react'

/** Adia a atualização de um valor até que ele pare de mudar por `delayMs`.
 *  Usado no campo de busca da tabela de clientes para evitar refazer a
 *  "consulta" a cada tecla digitada. */
export function useDebounce<T>(valor: T, delayMs = 350): T {
  const [valorAdiado, setValorAdiado] = useState(valor)

  useEffect(() => {
    const timeout = setTimeout(() => setValorAdiado(valor), delayMs)
    return () => clearTimeout(timeout)
  }, [valor, delayMs])

  return valorAdiado
}
