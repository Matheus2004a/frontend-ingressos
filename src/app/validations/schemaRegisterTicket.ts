import { z } from 'zod'

const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/

export const schemaRegisterTicket = z.object({
  type: z.enum(['PISTA', 'VIP'], {
    required_error: 'Tipo de ingresso é obrigatório',
  }),
  price: z.union([z.string().min(1, 'Preço é obrigatório'), z.number()]),
  qtTicket: z.union([
    z.string().min(1, 'Quantidade é obrigatória'),
    z.number(),
  ]),
  dtAvailability: z
    .string()
    .min(1, 'Data de disponibilidade é obrigatória')
    .regex(
      datetimeLocalRegex,
      'Data de disponibilidade deve estar no formato YYYY-MM-DDTHH:mm',
    ),
})

export type TypeSchemaRegisterTicket = z.infer<typeof schemaRegisterTicket>
