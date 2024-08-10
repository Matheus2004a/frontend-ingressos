import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate, formatPrice } from '@/lib/utils'
import useSales from './useSales'

export default function Sales() {
  const { sales, error, isPending } = useSales()

  if (isPending) return <p>Carregando ingressos vendidos...</p>

  if (error) {
    return <p>Erro ao carregar os ingressos vendidos: {error.message}</p>
  }

  if (sales?.length === 0) {
    return <p>Você ainda não vendeu nenhum ingresso.</p>
  }

  return (
    <Table className="px-6 py-5">
      <TableCaption>Ingressos vendidos: {sales?.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Show</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Valor pago</TableHead>
          <TableHead>Data de Início</TableHead>
          <TableHead>Data de Término</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales?.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell className="font-medium">
              {sale.ticket.event.name}
            </TableCell>
            <TableCell>{sale.user.name}</TableCell>
            <TableCell>{formatPrice(Number(sale.ticket.price))}</TableCell>
            <TableCell>
              {formatDate(new Date(sale.ticket.event.dtStart))}
            </TableCell>
            <TableCell>
              {formatDate(new Date(sale.ticket.event.dtEnd))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
