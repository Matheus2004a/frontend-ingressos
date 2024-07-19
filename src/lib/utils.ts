import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateToDateTimeLocal(date: string) {
  const newDate = new Date(date)

  const year = newDate.getFullYear()
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')
  const hours = newDate.getHours().toString().padStart(2, '0')
  const minutes = newDate.getMinutes().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function currencyStringToNumber(value: string | number) {
  if (typeof value === 'number') {
    return value
  }

  const sanitizedString = value.replace(/\./g, '').replace(',', '.')
  return Number(sanitizedString)
}

export function generateRandomPrice(
  min: number = 10,
  max: number = 100,
): string {
  // Gera um número aleatório dentro do intervalo [min, max]
  const price = Math.random() * (max - min) + min
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
