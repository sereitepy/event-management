import EventForm from '@/app/[locale]/admin/components/events/event-form'
import { getCategories } from '@/lib/api/categories'
import { verifyAdminAccess } from '@/lib/auth'
import { redirect } from 'next/navigation'

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
    getCategories(),
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
