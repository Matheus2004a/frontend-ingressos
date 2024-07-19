import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectCitiesProps {
  value: string
  onChange(value: string): void
}

export function SelectTypeTicket({ value, onChange }: SelectCitiesProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo do ingresso" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipos</SelectLabel>
          <SelectItem value="PISTA">Pista</SelectItem>
          <SelectItem value="VIP">Vip</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
