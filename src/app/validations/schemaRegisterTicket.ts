import { z } from 'zod'

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
    .date(),
})

export type TypeSchemaRegisterTicket = z.infer<typeof schemaRegisterTicket>
