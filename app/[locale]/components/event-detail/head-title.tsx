import { formatEventDateDetails, formatEventTime } from '@/lib/utils/formatters'
import { EventDetailType } from '@/types/event'
import { CalendarCheck2, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'

interface HeadeTitleProp {
  data: EventDetailType | undefined
}

export default function HeadTitle({ data }: HeadeTitleProp) {
  return (
    <section className='relative w-full rounded-lg overflow-hidden group'>
      <Image
        src={data?.image ?? '/images/concert1.jpg'}
        alt={data?.title ?? 'event-details'}
        width={1200}
        height={700}
        className='w-full h-90 md:h-75 lg:h-100 object-cover object-center rounded-lg transition-all ease-in-out duration-300 hover:scale-110 group-hover:scale-110'
        loading='eager'
      />
      {/* Dark Overlay for text readability */}
      <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-transparent rounded-lg peer' />
      <div className='absolute bottom-0 left-0 p-10 flex flex-col gap-4 w-full'>
        <h1 className='text-5xl md:text-5xl lg:text-6xl font-bold text-white'>
          {data?.title ?? 'No Title'}
        </h1>
        <section className='flex items-center gap-3 flex-wrap'>
          {/* start date and end date */}
          <div className='flex items-center gap-1 font-semibold text-white'>
            <span className='flex items-center gap-2'>
              <CalendarCheck2 size='20px' />
              <p>
                {data?.start_date
                  ? formatEventDateDetails(data?.start_date)
                  : 'No date specified'}
              </p>
            </span>
            <p>-</p>
            <p>
              {data?.end_date
                ? formatEventDateDetails(data?.end_date)
                : 'No date specified'}
            </p>
          </div>
          {/* event start time to end time */}
          <div className='flex items-center gap-2 font-semibold text-white'>
            <span className='flex items-center gap-2'>
              <Clock size='20px' />
              <p>
                {data?.start_time
                  ? formatEventTime(data?.start_time)
                  : 'No time specified'}
              </p>
            </span>
            <p>-</p>
            <p>
              {data?.end_time
                ? formatEventTime(data?.end_time)
                : 'No time specified'}
            </p>
          </div>
          {/* location */}
          <div className='flex items-center gap-2 font-semibold text-white'>
            <span className='flex items-center gap-2'>
              <MapPin size='20px' />
              <p>{data?.location ?? 'No location specified'}</p>
            </span>
          </div>
        </section>
      </div>
    </section>
  )
}
