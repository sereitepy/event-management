import SpeakersTable from '@/app/components/admin/speakers'
import { Button } from '@/components/ui/button'
import { getSpeakers } from '@/lib/api/speakers'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function SpeakerPage() {
  const speakers = await getSpeakers()

  return (
    <div className='max-w-7xl mx-auto px-6  flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Speakers</h1>
          <p className='text-muted-foreground'>Manage all speakers</p>
        </div>
        <Link href='/admin/speakers/new'>
          <Button>
            <Plus className='h-4 w-4' />
            Create Speaker
          </Button>
        </Link>
      </div>

      <SpeakersTable speakers={speakers.data} />
    </div>
  )
}
