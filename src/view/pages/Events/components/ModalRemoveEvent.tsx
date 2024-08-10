import { Event } from '@/app/entities/Event'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import useModalRemoveEvent from '@/view/pages/Events/useModalRemoveEvent'
import { Trash } from 'lucide-react'

export function ModalRemoveEvent({ event }: { event: Event }) {
  const { removeEvent, isPending, isAdmin } = useModalRemoveEvent()

  if (!isAdmin) {
    return null
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash className="w-5 h-5 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remoção de evento</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar o evento{' '}
            <strong>{event.name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => removeEvent(event.id)}
            className="bg-red-500 hover:bg-red-600"
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
