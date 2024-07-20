import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FormRegisterTicket } from './components/FormRegisterTicket'
import useTickets from './useTickets'

export default function Tickets() {
  const { tickets, isLoading } = useTickets()

  if (isLoading) {
    return <p>Carregando ingressos...</p>
  }

  return (
    <div className="px-6 py-5">
      <h2 className="text-2xl font-bold mb-4">Listagem de ingressos</h2>

      <form className="flex items-center gap-3 max-w-lg mb-4">
        <Link to="/">
          <Button variant="ghost" className="p-0">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex items-center relative w-11/12">
          <Input
            type="search"
            name="q"
            placeholder="Pesquise por ingressos..."
            className="text-base"
          />
          <Search className="w-4 h-4 absolute right-3" />
        </div>
      </form>

      <FormRegisterTicket />

      <ul className="flex flex-col gap-4">
        {tickets?.map((ticket) => (
          <Card key={ticket.id} className="min-w-[350px]">
            <CardContent>
              <small className="block font-semibold">
                Encerra em: {formatDate(new Date(ticket.dtAvailability))}
              </small>
            </CardContent>
            <CardFooter>
              <span className="font-bold">Qtd: {ticket.qtTicket}</span>
              <span className="font-bold">Tipo: {ticket.type}</span>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  )
}
