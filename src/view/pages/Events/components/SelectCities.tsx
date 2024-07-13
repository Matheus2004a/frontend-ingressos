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
import { cities } from '@/data/constantes.json'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export function SelectCities({
  field,
}: {
  field: ControllerRenderProps<FieldValues, 'location'>
}) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o local do evento" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Locais</SelectLabel>
          {cities.map((city) => (
            <SelectItem
              key={city.id}
              value={`${city.nome}-${city.microrregiao.mesorregiao.UF.sigla}`}
            >
              {city.nome} - {city.microrregiao.mesorregiao.UF.sigla}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
