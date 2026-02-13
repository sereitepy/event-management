import { Event, EventAdmin, EventDetailType } from '@/types/event'
import { API_BASE_URL } from '../definitions'


function transformEvent(backendEvent: EventAdmin): Event {
  return {
    id: backendEvent.id.toString(),
    image: backendEvent.imageUrls?.[0] || '',
    start_date: `${backendEvent.startDate}T${backendEvent.startTime}`,
    title: backendEvent.title,
    location: `${backendEvent.location}, ${backendEvent.khan}`,
    price: Math.round(backendEvent.price * 100), // Convert to cents
    currency: 'USD',
    category: backendEvent.categoryName,
  }
}

function transformEventDetail(backendEvent: EventAdmin): EventDetailType {
  return {
    id: backendEvent.id.toString(),
    title: backendEvent.title,
    description: backendEvent.description,
    start_date: `${backendEvent.startDate}T${backendEvent.startTime}`,
    end_date: `${backendEvent.endDate}T${backendEvent.endTime}`,
    start_time: `${backendEvent.startDate}T${backendEvent.startTime}`,
    end_time: `${backendEvent.endDate}T${backendEvent.endTime}`,
    image: backendEvent.imageUrls?.[0] || '',
    location: backendEvent.location,
    google_map_link: '',
    price: Math.round(backendEvent.price * 100), // Convert to cents
    currency: 'USD',
    category: backendEvent.categoryName,

    speakers: [],
    schedule: [],
    created_at: backendEvent.createdAt,
    updated_at: backendEvent.updatedAt || backendEvent.createdAt,
  }
}

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
  const url = `${API_BASE_URL}/api/v1/events${queryString ? `?${queryString}` : ''}`

  const res = await fetch(url, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  const response = await res.json()
  const backendEvents = response.content || []
  return backendEvents.map(transformEvent)
}

export async function getEventById(id: string): Promise<EventDetailType> {
  const res = await fetch(`${API_BASE_URL}/api/v1/events/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch event detail')
  }

  const backendEvent = await res.json()
  return transformEventDetail(backendEvent)
}
