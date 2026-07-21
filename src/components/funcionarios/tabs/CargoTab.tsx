import type { FuncionarioCargo } from '@/types/funcionario'
import { DEPARTAMENTOS_DISPONIVEIS } from '@/types/funcionario'
import { TextField } from '@/components/TextField'
import { SelectField } from '@/components/SelectField'
import { TextAreaField } from '@/components/TextAreaField'
import type { FuncionarioFormErrors } from '@/hooks/useFuncionarioForm'

interface CargoTabProps {
  cargo: FuncionarioCargo
  errors: FuncionarioFormErrors
  onChange: (patch: Partial<FuncionarioCargo>) => void
  onClearError: (campo: keyof FuncionarioFormErrors) => void
}

export function CargoTab({ cargo, errors, onChange, onClearError }: CargoTabProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField
        label="Cargo *"
        value={cargo.cargo}
        error={errors.cargo}
        onChange={(e) => {
          onChange({ cargo: e.target.value })
          onClearError('cargo')
        }}
      />
      <SelectField
        label="Departamento *"
        value={cargo.departamento}
        error={errors.departamento}
        placeholder="Selecione um departamento"
        options={DEPARTAMENTOS_DISPONIVEIS.map((d) => ({ value: d, label: d }))}
        onChange={(e) => {
          onChange({ departamento: e.target.value })
          onClearError('departamento')
        }}
      />
      <TextField
        label="Data de admissão *"
        type="date"
        value={cargo.dataAdmissao}
        error={errors.dataAdmissao}
        onChange={(e) => {
          onChange({ dataAdmissao: e.target.value })
          onClearError('dataAdmissao')
        }}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Observações"
        value={cargo.observacoes}
        placeholder="Anotações sobre o cargo (ex.: responsabilidades específicas)."
        onChange={(e) => onChange({ observacoes: e.target.value })}
        className="sm:col-span-2"
      />
    </div>
  )
}
