import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import useRating from './useRating'

const rates = ['0', '1', '2', '3', '4', '5']

export default function Rating() {
  const { form, onSubmit, isPending } = useRating()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-6 py-5"
      >
        <h2 className="text-2xl font-bold">Faça sua avaliação abaixo</h2>
        <p>
          Avalie como foi sua experiência usando nosso site ao escolher seus
          eventos.
        </p>

        <FormField
          control={form.control}
          name="note"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Dê sua nota</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-y-1"
                >
                  {rates.map((rate) => (
                    <FormItem
                      key={rate}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={rate} />
                      </FormControl>
                      <FormLabel className="font-normal">{rate}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte nos detalhes o que achou do evento escolhido"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <footer className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>

          <Button type="submit" disabled={isPending}>
            Enviar avaliação
          </Button>
        </footer>
      </form>
    </Form>
  )
}
