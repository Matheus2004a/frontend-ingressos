import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return date.toLocaleString('pt-BR')
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
