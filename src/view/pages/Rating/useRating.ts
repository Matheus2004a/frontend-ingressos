import { RateRequest } from '@/app/entities/Rate'
import useAuth from '@/app/hooks/useAuth'
import RateService from '@/app/services/RateService'
import { TypeSchemaRating, schemaRating } from '@/app/validations/schemaRating'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export default function useRating() {
  const { user } = useAuth()

  const form = useForm<TypeSchemaRating>({
    resolver: zodResolver(schemaRating),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RateRequest) => RateService.create(data),
    onSuccess: () => {
      toast({
        title: 'Avaliação enviada com sucesso. Agradecemos seu feedback',
      })
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: 'destructive' })
    },
  })

  async function onSubmit(values: TypeSchemaRating) {
    await mutateAsync({
      note: Number(values.note),
      description: values.description,
      userId: user?.id,
    })
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}
