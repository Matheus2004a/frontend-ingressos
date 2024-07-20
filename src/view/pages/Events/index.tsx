import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatDate, generateRandomPrice } from '@/lib/utils'
import { ModalRegisterEvent } from '@/view/pages/Events/components/ModalRegisterEvent'
import { ModalRemoveEvent } from '@/view/pages/Events/components/ModalRemoveEvent'
import { LogOut, MapPin, Search, TicketCheck } from 'lucide-react'
import { ModalUpdateEvent } from './components/ModalUpdateEvent'
import useEvents from './useEvents'

export default function EventList() {
  const { events, isLoading, handleSearch, query, signout, onEventSelected } =
    useEvents()

  if (isLoading) {
    return <p>Carregando eventos...</p>
  }

  return (
    <div className="px-6 py-5">
      <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>

      <Button
        onClick={signout}
        className="absolute top-4 right-4 flex gap-2 text-white font-bold py-2 px-4 rounded-lg"
      >
        <LogOut size={24} />
        Sair
      </Button>

      <form
        className="flex items-center gap-3 max-w-lg mb-4"
        onSubmit={handleSearch}
      >
        <div className="flex items-center relative w-11/12">
          <Input
            type="search"
            name="q"
            defaultValue={query ?? ''}
            placeholder="Pesquise por eventos..."
            className="text-base"
          />
          <Search className="w-4 h-4 absolute right-3" />
        </div>
        <ModalRegisterEvent />
      </form>

      <ul className="flex flex-col gap-4">
        {events?.map((event) => (
          <Card key={event.id} className="min-w-[350px]">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>{event.name}</CardTitle>

              <div className="flex items-center">
                <Button variant="ghost" onClick={() => onEventSelected(event)}>
                  <TicketCheck />
                </Button>
                <ModalUpdateEvent event={event} />
                <ModalRemoveEvent eventId={event.id} eventName={event.name} />
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-gray-500 flex items-center gap-1">
                <MapPin size={16} />
                {event.location}
              </span>

              <small className="block font-semibold">
                Início: {formatDate(new Date(event.dtStart))}
              </small>
              <small className="font-semibold">
                Término: {formatDate(new Date(event.dtEnd))}
              </small>
            </CardContent>
            <CardFooter>
              <span className="font-bold">{generateRandomPrice(10, 100)}</span>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  )
}
