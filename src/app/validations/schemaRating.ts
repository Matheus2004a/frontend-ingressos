import { z } from 'zod'

export const schemaRating = z.object({
  note: z.string().min(1, 'Nota é obrigatória'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'Descrição deve ter no mínimo 10 caracteres.')
    .max(200, 'Descrição deve ter no máximo 200 caracteres.'),
})

export type TypeSchemaRating = z.infer<typeof schemaRating>
