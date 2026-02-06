import { getCategoriesAdmin, getEventByIdAdmin } from '@/app/actions/admin-events'
import { notFound } from 'next/navigation'
import EventForm from '../../../components/events/event-form'

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const eventId = parseInt(params.id)

  if (isNaN(eventId)) {
    notFound()
  }

  // Fetch both categories and event data in parallel
  const [categoriesResult, eventResult] = await Promise.all([
    getCategoriesAdmin(),
    getEventByIdAdmin(eventId),
  ])

  // Handle errors
  if (!categoriesResult.success) {
    return (
      <div className='p-4'>
        <p className='text-red-600'>
          Error loading categories: {categoriesResult.message}
        </p>
      </div>
    )
  }

  if (!eventResult.success) {
    return (
      <div className='p-4'>
        <p className='text-red-600'>
          Error loading event: {eventResult.message}
        </p>
      </div>
    )
  }

  const categories = categoriesResult.data
  const eventData = eventResult.data

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Edit Event</h1>
      <EventForm
        categories={categories}
        initialData={eventData}
        isEditMode={true}
        eventId={eventId}
      />
    </div>
  )
}
