import { getEvents } from '@/lib/api/user-events'
import Hero from '../components/user/hero'
import EventCards from '../components/user/event-cards'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
    location?: string
    date?: string
  }>
}) {
  const filters = await searchParams

  const events = await getEvents({
    category: filters.search,
    location: filters.location,
    date: filters.date,
  })

  return (
    <div>
      <Hero />
      <EventCards events={events} />
    </div>
  )
}
