import { ButtonSpinner } from '@/components/ButtonSpinner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useModalRegisterTicket from '../useModalRegisterTicket'
import { SelectTypeTicket } from './SelectTypeTicket'

export function ModalRegisterTicket() {
  const { form, onSubmit, isLoading, isDialogOpen, setIsDialogOpen } =
    useModalRegisterTicket()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar ticket</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Cadastrar ingresso</DialogTitle>
          <DialogDescription>
            Cadastre um novo ingresso à nossa rede
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <SelectTypeTicket
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  Cancelar
                </Button>
              </DialogClose>
              <ButtonSpinner type="submit" isLoading={isLoading}>
                Cadastrar
              </ButtonSpinner>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
