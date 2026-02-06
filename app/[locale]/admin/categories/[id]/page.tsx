import { redirect } from 'next/navigation'
import EventForm from '../../components/events/event-form'
import { verifyAdminAccess } from '@/lib/auth'

async function getCategories(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'}/api/v1/admin/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    )
    if (!response.ok) {
      return []
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

async function getEvent(id: string, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'}/api/v1/admin/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    )
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return null
  }
}

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const accessToken = await verifyAdminAccess()

  const [categories, event] = await Promise.all([
    getCategories(accessToken),
    getEvent(params.id, accessToken),
  ])

  if (!event) {
    redirect('/admin/events')
  }

  return (
    <EventForm
      mode='edit'
      initialData={event}
      eventId={parseInt(params.id)}
      categories={categories}
    />
  )
}
