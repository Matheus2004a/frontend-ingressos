import { z } from 'zod'

const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/

export const schemaRegisterTicket = z.object({
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
