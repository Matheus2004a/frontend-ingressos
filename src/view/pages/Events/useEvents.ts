import { Event } from '@/app/entities/Event'
import useAuth from '@/app/hooks/useAuth'
import useEvent from '@/app/hooks/useEvent'
import EventsServices from '@/app/services/EventsServices'
import { useQuery } from '@tanstack/react-query'
import { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function useEvents() {
  const { user, signout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { handleEventSelected } = useEvent()

  const query = searchParams.get('q')

  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => EventsServices.listAll(),
    enabled: !!user,
  })

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q.toString()

    setSearchParams({ q: query })
    navigate(`/?q=${query}`)
  }

  const eventsFiltered = data?.filter((event) =>
    event.name.toLowerCase().includes(query?.toLowerCase() ?? ''),
  )

  function onEventSelected(event: Event) {
    handleEventSelected(event)
    navigate('/tickets')
  }

  return {
    events: !eventsFiltered ? data : eventsFiltered,
    query,
    isLoading,
    handleSearch,
    signout,
    onEventSelected,
    isAdmin,
  }
}
