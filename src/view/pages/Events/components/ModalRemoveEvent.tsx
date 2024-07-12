import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useModalRemoveEvent from '@/view/pages/Events/useModalRemoveEvent'
import { Trash } from 'lucide-react'
import { ButtonSpinner } from '../../../../components/ButtonSpinner'

interface ModalRemoveEventProps {
  eventId: string
  eventName: string
}

export function ModalRemoveEvent({
  eventId,
  eventName,
}: ModalRemoveEventProps) {
  const { removeEvent, isPending } = useModalRemoveEvent()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Trash className="w-5 h-5 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remoção de evento</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar o evento <strong>{eventName}</strong>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancelar</Button>
          </DialogClose>
          <ButtonSpinner
            isLoading={isPending}
            onClick={() => removeEvent(eventId)}
          >
            Sim
          </ButtonSpinner>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
