import { formatEventDateDetails, formatEventTime } from '@/lib/utils/formatters'
import { CalendarCheck2, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'

interface HeadeTitleProp {
  image: string | undefined
  title: string | undefined
  start_date: string | undefined
  end_date: string | undefined
  start_time: string | undefined
  end_time: string | undefined
  location: string | undefined
}

export default function HeadTitle({
  image,
  title,
  start_date,
  end_date,
  start_time,
  end_time,
  location,
}: HeadeTitleProp) {
  return (
    <section className='relative w-full rounded-lg overflow-hidden group'>
      <Image
        src={image ?? '/images/concert1.jpg'}
        alt={title ?? 'event-details'}
        width={1200}
        height={700}
        className='w-full h-90 md:h-75 lg:h-100 object-cover object-center rounded-lg transition-all ease-in-out duration-300 hover:scale-110 group-hover:scale-110'
        loading='eager'
      />
      {/* Dark Overlay for text readability */}
      <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-transparent rounded-lg peer' />
      <div className='absolute bottom-0 left-0 p-10 flex flex-col gap-4 w-full'>
        <h1 className='text-5xl md:text-5xl lg:text-6xl font-bold text-white'>
          {title ?? 'No Title'}
        </h1>
        <section className='flex items-center gap-3 flex-wrap'>
          {/* start date and end date */}
          <div className='flex items-center gap-1 font-semibold text-white'>
            <span className='flex items-center gap-2'>
              <CalendarCheck2 size='20px' />
              <p>
                {start_date
                  ? formatEventDateDetails(start_date)
                  : 'No date specified'}
              </p>
            </span>
            <p>-</p>
            <p>
              {end_date
                ? formatEventDateDetails(end_date)
                : 'No date specified'}
            </p>
          </div>
          {/* event start time to end time */}
          <div className='flex items-center gap-2 font-semibold text-white'>
            <span className='flex items-center gap-2'>
              <Clock size='20px' />
              <p>
                {start_time
                  ? formatEventTime(start_time)
                  : 'No time specified'}
              </p>
            </span>
            <p>-</p>
            <p>
              {end_time
                ? formatEventTime(end_time)
                : 'No time specified'}
            </p>
          </div>
          {/* location */}
          <div className='flex items-center gap-2 font-semibold text-white'>
            <span className='flex items-center gap-2'>
              <MapPin size='20px' />
              <p>{location ?? 'No location specified'}</p>
            </span>
          </div>
        </section>
      </div>
    </section>
  )
}
