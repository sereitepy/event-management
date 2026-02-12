import EventForm from '@/app/components/admin/events/event-form'
import { getEventByIdAdmin } from '@/lib/api/admin-events'
import { getCategories } from '@/lib/api/categories'
import { redirect } from 'next/navigation'

export default async function EditEventPage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = await params
  const [categories, event] = await Promise.all([
    getCategories(),
    getEventByIdAdmin(id),
  ])

  if (!event?.data) {
    redirect('/admin/events')
  }

  return (
    <EventForm
      mode='edit'
      initialData={event.data}
      eventId={id}
      categories={categories}
    />
  )
}
