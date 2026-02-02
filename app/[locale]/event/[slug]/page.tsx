import { Button } from '@/components/ui/button'
import { ArrowCircleLeftIcon } from '@phosphor-icons/react/ssr'
import Link from 'next/link'

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const eventDetails = [
    {
      id: 'ishishg',
    },
  ]

  return (
    <div>
      <Button className='rouned-2xl'>
        <Link href={`/`} className='flex gap-2 items-center'>
          <ArrowCircleLeftIcon size={50} weight='fill' />
          Go back home
        </Link>
      </Button>
      <h1>{slug}</h1>
    </div>
  )
}
