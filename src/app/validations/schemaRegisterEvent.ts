import { z } from 'zod'

export const schemaRegisterEvent = z.object({
  name: z
    .string()
    .min(1, {
      message: 'name must not be empty.',
    })
    .min(5, {
      message: 'name must be at least 5 characters.',
    }),
  location: z.string().min(1, {
    message: 'location must not be empty.',
  }),
  dtStart: z.date({
    required_error: 'A date start is required.',
  }),
  dtEnd: z
    .date({
      required_error: 'A date end is required.',
    })
    .refine(
      (val, ctx) => {
        const dtStart = ctx.parent.dtStart
        return Date.parse(val) > Date.parse(dtStart)
      },
      {
        message: 'dtEnd must be later than dtStart.',
      },
    ),
})

export type FormData = z.infer<typeof schemaRegisterEvent>
