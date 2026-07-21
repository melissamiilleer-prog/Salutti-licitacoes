interface LogoProps {
  className?: string
}

/**
 * Reproduz o lockup textual do logotipo do site institucional
 * (ícone dourado + "SALUTTI" em verde-floresta) sem depender do arquivo
 * de imagem, para este app poder evoluir de forma independente.
 * Caso o arquivo logo-wide.png seja copiado para este projeto (em
 * /public/brand/), basta trocar este componente por um <img>.
 */
export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest font-mono text-sm font-bold text-brass-pale">
        S
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-forest-deep">
        SALUTTI
      </span>
    </div>
  )
}
