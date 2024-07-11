import { z } from 'zod'

const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/

export const schemaRegisterEvent = z.object({
  name: z.string().min(1, 'Nome do evento é obrigatório').min(5),
  location: z
    .string()
    .min(1, 'Local do evento é obrigatório')
    .min(5, 'Local do evento deve ter no mínimo 5 caracteres'),
  dtStart: z
    .string()
    .min(1, 'Data de início é obrigatória')
    .regex(
      datetimeLocalRegex,
      'Data de início deve estar no formato YYYY-MM-DDTHH:mm',
    ),
  dtEnd: z
    .string()
    .min(1, 'Data de término é obrigatória')
    .regex(
      datetimeLocalRegex,
      'Data de término deve estar no formato YYYY-MM-DDTHH:mm',
    ),
})

export type TypeSchemaRegisterEvent = z.infer<typeof schemaRegisterEvent>
