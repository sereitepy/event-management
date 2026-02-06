import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { EventsTable } from '../events-table/page'
import { getEventsAdmin } from '@/app/actions/admin-events'

export default async function AdminEventsPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    redirect('/login')
  }

  // Verify admin
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )
    if (!payload.scope?.includes('ADMIN')) {
      redirect('/profile')
    }
  } catch {
    redirect('/login')
  }

  const events = await getEventsAdmin(accessToken)

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Events</h1>
          <p className='text-muted-foreground'>Manage all events</p>
        </div>
        <Link href='/admin/events/new'>
          <Button>
            <Plus className='h-4 w-4 mr-2' />
            Create Event
          </Button>
        </Link>
      </div>

      <EventsTable events={events} />
    </div>
  )
}
