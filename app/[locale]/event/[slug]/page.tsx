import { Button } from '@/components/ui/button'
import { mockEventDetails } from '@/mock-data/event-detail'
import { EventDetailType } from '@/types/event'
import { ArrowCircleLeftIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'
import EventDetailComponent from '../../components/event-detail'

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const getEventDetailById = (id: string): EventDetailType | undefined => {
    return mockEventDetails.find(event => event.id === id)
  }
  const data = getEventDetailById(slug)

  return (
    <div className='bg-secondary py-5 relative'>
      <div className='max-w-325 mx-auto flex flex-col gap-5 px-4 md:px-6 2xl:px-0'>
        <Link href={`/`}>
          <Button className='rounded-2xl flex gap-2 items-center font-bold text-md'>
            <ArrowCircleLeftIcon weight='fill' />
            Go Back
          </Button>
        </Link>
        <div>
          <EventDetailComponent data={data}/>
        </div>
      </div>
    </div>
  )
}
