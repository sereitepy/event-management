import { getCategoriesAdmin } from '@/app/actions/admin-events'
import EventForm from '../../components/events/event-form'

export default async function NewEventPage() {
  // Fetch categories on the server
  const categoriesResult = await getCategoriesAdmin()
  const categories = categoriesResult.success ? categoriesResult.data : []

  if (!categoriesResult.success) {
    return (
      <div className='p-4'>
        <p className='text-red-600'>
          Error loading categories: {categoriesResult.message}
        </p>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Create New Event</h1>
      <EventForm
        categories={categories}
        initialData={null}
        isEditMode={false}
        eventId={null}
      />
    </div>
  )
}
