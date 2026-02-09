import EventForm from '@/app/components/admin/events/event-form'
import { getAdminIndividualEvent } from '@/lib/api/admin-events'
import { getCategories } from '@/lib/api/categories'
import { verifyAdminAccess } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const accessToken = await verifyAdminAccess()

  const [categories, event] = await Promise.all([
    getCategories(),
    getAdminIndividualEvent(params.id, accessToken),
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
