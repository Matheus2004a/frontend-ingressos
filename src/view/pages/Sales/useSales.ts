import useAuth from '@/app/hooks/useAuth'
import SaleService from '@/app/services/SaleService'
import { useQuery } from '@tanstack/react-query'

export default function useSales() {
  const { signedIn, user } = useAuth()

  const { data, error, isPending } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => SaleService.listAll(user!.id),
    enabled: signedIn && !!user?.id,
  })

  return {
    sales: data,
    error,
    isPending,
  }
}
