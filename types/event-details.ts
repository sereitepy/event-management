export interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  image: string
  location: string
  google_map_link: string
  price: number // in cents btw
  currency: string
  category: 'Music' | 'Sports' | 'Theater' | 'Comedy' | 'Tech' | 'Business' | 'Education'
}
