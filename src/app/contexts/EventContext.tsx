import { createContext, useState } from 'react'
import { Event } from '../entities/Event'

interface EventContextProps {
  eventSelected: Event | null
  handleEventSelected(Event: Event): void
}

export const EventContext = createContext({} as EventContextProps)

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [eventSelected, setEventSelected] = useState<Event | null>(null)

  function handleEventSelected(event: Event) {
    setEventSelected(event)
  }

  return (
    <EventContext.Provider value={{ eventSelected, handleEventSelected }}>
      {children}
    </EventContext.Provider>
  )
}
