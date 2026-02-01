export interface Event {
  id: string
  title: string
  image: string
  location: string
  date: string // the ISO 8601 date format
  price: number // in cents btw
  currency: string
  category: 'Music' | 'Sports' | 'Theater' | 'Comedy' | 'Other'
}
