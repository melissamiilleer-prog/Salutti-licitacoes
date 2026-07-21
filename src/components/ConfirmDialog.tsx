import { Modal } from '@/components/Modal'
import { Button } from '@/components/Button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/** Diálogo de confirmação genérico — usado hoje para excluir clientes,
 *  reutilizável por qualquer outra ação destrutiva do sistema. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus-visible:outline-red-600 disabled:bg-red-600/50"
          >
            {isLoading ? 'Excluindo…' : confirmLabel}
          </Button>
        </>
      }
    >
      <p className="font-body text-sm text-ink-soft">{description}</p>
    </Modal>
  )
}
