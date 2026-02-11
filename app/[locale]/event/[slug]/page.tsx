import { getEventById } from '@/lib/api/user-events'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowCircleLeftIcon } from '@phosphor-icons/react/ssr'
import EventDetailComponent from '../../../components/user/event-detail'

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let data
  try {
    data = await getEventById(slug)
  } catch (error) {
    notFound()
  }

  return (
    <div className='bg-secondary py-5 relative'>
      <div className='max-w-325 mx-auto flex flex-col gap-5 px-4 md:px-6 2xl:px-0'>
        <Link href='/'>
          <Button className='rounded-2xl flex gap-2 items-center font-bold text-md'>
            <ArrowCircleLeftIcon weight='fill' />
            Go Back
          </Button>
        </Link>
        <EventDetailComponent data={data} />
      </div>
    </div>
  )
}
