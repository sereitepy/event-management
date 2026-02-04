import { mockEvent } from '@/mock-data/event'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('category') // Coming from search input
  const location = searchParams.get('location')
  const date = searchParams.get('date')

  let filteredEvents = mockEvent

  // Filter by search (checks title, category)
  if (search) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower)
    )
  }

  // Filter by location
  if (location) {
    const locationLower = location.toLowerCase()
    filteredEvents = filteredEvents.filter(event =>
      event.location.toLowerCase().includes(locationLower)
    )
  }

  // Filter by date (matches start_date)
  if (date) {
    filteredEvents = filteredEvents.filter(
      event => event.start_date.startsWith(date) // date is in YYYY-MM-DD format
    )
  }

  return NextResponse.json(filteredEvents)
}
