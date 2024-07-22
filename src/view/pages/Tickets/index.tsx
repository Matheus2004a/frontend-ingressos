import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FormRegisterTicket } from './components/FormRegisterTicket'

export default function Tickets() {
  return (
    <section className="px-6 py-5">
      <div className="flex items-center gap-3 max-w-lg mb-4">
        <Link to="/">
          <Button variant="ghost" className="p-0">
            <ArrowLeft />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Criação de ingressos</h2>
      </div>

      <FormRegisterTicket />
    </section>
  )
}
