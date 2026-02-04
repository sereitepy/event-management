import { Event, EventDetailType } from '@/types/event'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getEvents(filters?: {
  category?: string
  location?: string
  date?: string
}): Promise<Event[]> {
  const params = new URLSearchParams()

  if (filters?.category) params.append('category', filters.category)
  if (filters?.location) params.append('location', filters.location)
  if (filters?.date) params.append('date', filters.date)

  const queryString = params.toString()
  const url = `${API_BASE_URL}/api/events${queryString ? `?${queryString}` : ''}`

  const res = await fetch(url, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}

export async function getEventById(id: string): Promise<EventDetailType> {
  const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch event detail')
  }

  return res.json()
}
