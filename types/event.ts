export interface Event {
  id: string
  title: string
  description?: string
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  image: string
  location: string
  google_map_link?: string
  price: number // in cents
  currency: string
  category:
    | 'Music'
    | 'Sports'
    | 'Theater'
    | 'Comedy'
    | 'Tech'
    | 'Business'
    | 'Education'
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  image: string
  bio?: string
}

export interface ScheduleItem {
  id: string
  time: string
  title: string
  description: string
  location?: string
  speaker?: string
}

export interface TicketType {
  id: string
  name: string
  price: number // in cents
  description: string
  features: string[]
  available: boolean
  quantity_remaining?: number
}

export interface Venue {
  name: string
  address: string
  city: string
  state?: string
  country: string
  postal_code?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Organizer {
  name: string
  email: string
  phone: string
  website?: string
  logo?: string
}

export interface EventDetailType extends Event {
  speakers: Speaker[]
  schedule: ScheduleItem[]
  ticket_types?: TicketType[]
  venue?: Venue
  organizer?: Organizer
  capacity?: number
  attendees_count?: number
  tags?: string[]
  requirements?: string[]
  amenities?: string[]
  faq?: Array<{
    question: string
    answer: string
  }>
  social_links?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  is_featured?: boolean
  created_at?: string
  updated_at?: string
}

// -------------------ADMIN------------
export interface EventFormData {
  title: string
  description: string | undefined
  startDate: string
  endDate: string | undefined
  startTime: string | undefined
  endTime: string | undefined
  location: string
  khan: string
  price: number
  capacity: number
  categoryId: number | string
  imageUrls: string[]
}