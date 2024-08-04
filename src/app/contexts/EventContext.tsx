import { createContext, useState } from 'react'
import { Event } from '../entities/Event'

export interface EventContextProps {
  eventSelected: Event | null
  handleEventSelected(event: Event): void
  ticketTypeSelected: 'PISTA' | 'VIP' | null
  handleTicketTypeSelected(ticketType: 'PISTA' | 'VIP'): void
}

export const EventContext = createContext({} as EventContextProps)

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [eventSelected, setEventSelected] = useState<Event | null>(null)
  const [ticketTypeSelected, setTicketSelected] = useState<
    'PISTA' | 'VIP' | null
  >(null)

  function handleEventSelected(event: Event) {
    setEventSelected(event)
  }

  function handleTicketTypeSelected(ticketType: 'PISTA' | 'VIP') {
    setTicketSelected(ticketType)
  }

  return (
    <EventContext.Provider
      value={{
        eventSelected,
        handleEventSelected,
        ticketTypeSelected,
        handleTicketTypeSelected,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
