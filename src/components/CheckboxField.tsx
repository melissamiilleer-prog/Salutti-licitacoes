import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
}

export function CheckboxField({ label, description, id, className = '', ...rest }: CheckboxFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <label
      htmlFor={fieldId}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink-soft/15 bg-forest-mist/30 p-3.5"
    >
      <input
        id={fieldId}
        type="checkbox"
        className={`mt-0.5 h-4 w-4 rounded border-ink-soft/40 text-forest focus:ring-forest-mist ${className}`}
        {...rest}
      />
      <span>
        <span className="block font-body text-sm font-medium text-ink">{label}</span>
        {description && (
          <span className="block font-body text-xs text-ink-soft">{description}</span>
        )}
      </span>
    </label>
  )
}
