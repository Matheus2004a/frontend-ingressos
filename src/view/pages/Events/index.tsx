import { LogOut, MapPin, Search } from 'lucide-react'
import useAuth from '../../../app/hooks/useAuth'
import { ModalRegisterEvent } from '../../../components/ModalRegisterEvent'
import { Button } from '../../../components/ui/button'
import { DialogTrigger } from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { formatDate, generateRandomPrice } from '../../../lib/utils'
import useEvents from './useEvents'

export default function EventList() {
  const { signout } = useAuth()
  const { events, isLoading } = useEvents()

  if (isLoading) {
    return <p>Carregando eventos...</p>
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>

      <Button
        onClick={signout}
        className="fixed top-4 right-4 flex gap-2 text-white font-bold py-2 px-4 rounded-lg"
      >
        <LogOut size={24} />
        Sair
      </Button>

      <form className="flex items-center gap-3 px-4 py-3 max-w-lg">
        <div className="flex items-center relative w-11/12">
          <Input
            type="search"
            name="q"
            placeholder="Pesquise por eventos..."
            className="text-base"
          />
          <Search className="w-4 h-4 absolute right-3" />
        </div>
        <ModalRegisterEvent>
          <DialogTrigger asChild>
            <Button>Cadastrar evento</Button>
          </DialogTrigger>
        </ModalRegisterEvent>
      </form>

      <ul className="space-y-4 flex flex-col gap-4">
        {events.map((event) => (
          <li key={event.id} className="shadow-lg p-4">
            <figure className="flex flex-shrink-0 gap-4">
              <img
                className="rounded-lg"
                src="https://loremflickr.com/500/200"
                alt={event.name}
              />
              <figcaption className="flex flex-col justify-between items-stretch">
                <div>
                  <h3 className="text-lg font-medium">{event.name}</h3>
                  <span className="text-gray-500 flex items-center gap-1">
                    <MapPin size={16} />
                    {event.location}
                  </span>

                  <small className="text-gray-500 block">
                    Início: {formatDate(new Date(event.dtStart))}
                  </small>
                  <small className="text-gray-500">
                    Término: {formatDate(new Date(event.dtEnd))}
                  </small>
                </div>

                <span className="font-bold">
                  {generateRandomPrice(10, 100)}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}
