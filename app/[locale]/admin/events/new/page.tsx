import { getCategories } from '@/lib/api/categories'
import EventForm from '@/app/components/admin/events/event-form'
import { verifyAdminAccess } from '@/lib/auth'

export default async function NewEventPage() {
  await verifyAdminAccess()
  const categories = await getCategories()

  return <EventForm mode='create' categories={categories} />
}
