import { z } from 'zod'

export const schemaRegisterSale = z.object({
  amountTotal: z.union([
    z.string().min(1, 'Quantidade de ingressos é obrigatória'),
    z.number(),
  ]),
})

export type TypeSchemaRegisterSale = z.infer<typeof schemaRegisterSale>
