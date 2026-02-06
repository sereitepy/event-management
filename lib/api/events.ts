import { Event, EventDetailType } from '@/types/event'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:2223'

// Transform backend event to frontend Event type
function transformEvent(backendEvent: any): Event {
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

// Transform backend event detail to frontend EventDetailType
function transformEventDetail(backendEvent: any): EventDetailType {
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
    google_map_link: '', // Not provided by backend
    price: Math.round(backendEvent.price * 100), // Convert to cents
    currency: 'USD',
    category: backendEvent.categoryName,

    // These fields aren't in your backend response, so we'll provide defaults
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

  const backendEvents = await res.json()
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
