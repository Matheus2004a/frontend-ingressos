import z from 'zod'

export const schemaSignin = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter 6 caracteres no mínimo'),
})

export type FormData = z.infer<typeof schemaSignin>
