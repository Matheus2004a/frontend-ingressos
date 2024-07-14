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

interface SelectCitiesProps {
  value: string
  onChange(value: string): void
}

export function SelectCities({ value, onChange }: SelectCitiesProps) {
  return (
    <Select value={value} onValueChange={onChange}>
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
