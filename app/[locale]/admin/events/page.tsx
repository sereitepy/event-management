import { Button } from '@/components/ui/button'
import { verifyAdminAccess } from '@/lib/auth'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { EventsTable } from '../../../components/admin/events/events-table'
import { getAdminEvents } from '@/lib/api/admin-events'

export default async function AdminEventsPage() {
  const accessToken = await verifyAdminAccess()
  const events = await getAdminEvents(accessToken)

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Events</h1>
          <p className='text-muted-foreground'>Manage all events</p>
        </div>
        <Link href='/admin/events/new'>
          <Button>
            <Plus className='h-4 w-4' />
            Create Event
          </Button>
        </Link>
      </div>

      <EventsTable events={events} />
    </div>
  )
}
