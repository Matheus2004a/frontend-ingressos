import { ButtonSpinner } from '@/components/ButtonSpinner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { formatDateToDateTimeLocal } from '@/lib/utils'
import { Link, Navigate } from 'react-router-dom'
import useFormRegisterTicket from '../useFormRegisterTicket'
import { SelectTypeTicket } from './SelectTypeTicket'
import { SelectedEventLocation } from './SelectedEventLocation'

export function FormRegisterTicket() {
  const { form, onSubmit, isLoading, eventSelected } = useFormRegisterTicket()

  if (!eventSelected) {
    return <Navigate to="/" replace />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h3 className="text-lg font-semibold">Informações do evento</h3>
        <div className="flex items-center gap-2">
          <FormItem>
            <FormLabel>Nome do evento</FormLabel>
            <FormControl>
              <Input
                type="text"
                disabled
                className="w-[250px] text-ellipsis"
                defaultValue={eventSelected.name}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Local do evento</FormLabel>
            <FormControl>
              <SelectedEventLocation value={eventSelected.location} />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Data de início</FormLabel>
            <FormControl>
              <Input
                type="datetime-local"
                defaultValue={formatDateToDateTimeLocal(eventSelected.dtStart)}
                disabled
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Data de término</FormLabel>
            <FormControl>
              <Input
                type="datetime-local"
                defaultValue={formatDateToDateTimeLocal(eventSelected.dtEnd)}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        <h3 className="font-semibold">
          Preencha abaixo as informações do ingresso
        </h3>

        <FormField
          control={form.control}
          name="price"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do ingresso</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insira o preço do ingresso"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qtTicket"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade de ingressos</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insira a quantidade de ingressos"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de ingresso</FormLabel>
              <SelectTypeTicket value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dtAvailability"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de disponibilidade</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link to="/">
          <Button type="button" variant="destructive" className="mr-2">
            Cancelar
          </Button>
        </Link>

        <ButtonSpinner type="submit" isLoading={isLoading}>
          Cadastrar
        </ButtonSpinner>
      </form>
    </Form>
  )
}
