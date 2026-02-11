import EventForm from '@/app/components/admin/events/event-form'
import { getCategories } from '@/lib/api/categories'
import { getEventById } from '@/lib/api/user-events'
import { EventFormData } from '@/types/event'
import { redirect } from 'next/navigation'

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const [categories, event] = await Promise.all([
    getCategories(),
    getEventById(id),
  ])

  const eventFormData: EventFormData = {
    title: event.title,
    description: event.description,
    startDate: event.start_date.split('T')[0],
    endDate: event.end_date?.split('T')[0],
    startTime: event.start_time?.split('T')[1].slice(0, 5),
    endTime: event.end_time?.split('T')[1].slice(0, 5),
    location: event.location ?? '',
    khan: event?.venue?.address ?? '',
    price: event.price,
    capacity: event.capacity ?? 0,
    categoryId: event.category,
    imageUrls: event.image ? [event.image] : [],
  }

  if (!event) {
    redirect('/admin/events')
  }

  return (
    <EventForm
      mode='edit'
      initialData={eventFormData}
      eventId={id}
      categories={categories}
    />
  )
}
