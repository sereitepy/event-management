import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatEventDate, formatPrice } from '@/lib/utils/formatters'
import { Event } from '@/types/event'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  data: Event
}

export default function EventCard({ data }: EventCardProps) {
  return (
    <Link href={`/event/${data.id}`}>
      <Card className='h-full py-0 pb-2 relative overflow-hidden flex flex-col gap-2 w-full hover:border-ring border rounded-xl cursor-pointer'>
        <div className='w-full h-40 lg:h-60 overflow-hidden relative rounded-t-md'>
          <div className='absolute z-10 top-2.5 left-2.5 px-3 py-1 bg-purple-600 rounded-xl font-semibold text-sm'>
            {data.category}
          </div>
          <div className='flex absolute z-10 top-2.5 right-2.5 px-3 py-1 bg-black/70 font-bold rounded-lg text-sm'>
            {formatEventDate(data.start_date)}
          </div>
          <Image
            src={data.image}
            alt={data.title}
            width={900}
            height={240}
            className='w-full h-full object-cover hover:scale-110 transition-all ease-in-out'
          />
        </div>

        <div className='flex flex-col flex-1 justify-between gap-3 px-2 pb-1'>
          <CardHeader className='px-3'>
            <CardTitle className='text-lg font-bold'>{data.title}</CardTitle>
            <CardDescription className='flex flex-col gap-1'>
              <span className='flex gap-1 items-center'>
                <MapPin size={16} />
                {data.location}
              </span>
            </CardDescription>
          </CardHeader>

          <div className='flex flex-col gap-2'>
            <Separator />
            <CardFooter className='flex items-center justify-between pr-2 pl-3'>
              <div>
                <p className='text-sm text-secondary-foreground'>
                  Starting from
                </p>
                <p className='text-base lg:text-lg font-bold'>
                  {formatPrice(data.price, data.currency)}
                </p>
              </div>
              <Button
                variant='ghost'
                className='p-3 lg:text-base font-bold hover:bg-secondary active:bg-primary bg-border'
              >
                Attend
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  )
}
