import { LogOut } from 'lucide-react'
import useAuth from '../../../app/hooks/useAuth'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { formatDate } from '../../../lib/utils'

const events = [
  {
    id: 1,
    title: 'Evento 1',
    date: '2021-10-10T03:00:00.000Z',
    location: 'São Paulo',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Evento 2',
    date: '2021-10-10T03:00:00.000Z',
    location: 'São Paulo',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Evento 3',
    date: '2021-10-10T03:00:00.000Z',
    location: 'São Paulo',
    imageUrl: 'https://via.placeholder.com/150',
  },
]

export default function EventList() {
  const { signout } = useAuth()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>

      <Button
        onClick={signout}
        className="fixed top-4 right-4 flex gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        <LogOut size={24} />
        Sair
      </Button>

      <form className="flex items-center gap-4 mb-8 max-w-lg">
        <Input
          type="search"
          placeholder="Pesquise por eventos..."
          className="text-base"
        />
        <Button>Cadastrar evento</Button>
      </form>

      <ul className="space-y-4 flex flex-col gap-4 p-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="border-b pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-16 h-16 rounded-full"
                  src={event.imageUrl}
                  alt={event.title}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{event.title}</h3>
                <p className="text-gray-500">
                  {formatDate(new Date(event.date))}
                </p>
                <p className="text-gray-500">{event.location}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
