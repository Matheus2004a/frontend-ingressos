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
import useModalConfirmationSaleTicket from '../useModalConfirmationSaleTicket'

export function ModalConfirmationSaleTicket({
  children,
}: {
  children: React.ReactNode
}) {
  const { form, onSubmit, isPending, isDialogOpen, setIsDialogOpen } =
    useModalConfirmationSaleTicket()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Cadastrar venda</DialogTitle>
          <DialogDescription>
            Cadastre uma nova venda de ingresso à nossa rede
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="amountTotal"
              defaultValue={1}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de ingresso</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Digite a quantidade de ingresso que deseja comprar"
                      disabled
                      {...field}
                    />
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
              <ButtonSpinner type="submit" isLoading={isPending}>
                Cadastrar
              </ButtonSpinner>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
