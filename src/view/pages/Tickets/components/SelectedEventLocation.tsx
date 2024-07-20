import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectedEventLocation({ value }: { value: string }) {
  return (
    <Select value={value} disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={value}>{value}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
