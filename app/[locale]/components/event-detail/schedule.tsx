import { ScheduleItem } from '@/types/event'
import { ClipboardClock } from 'lucide-react'

interface EventScheduleProp {
  schedule: ScheduleItem[] | undefined
}

export default function EventSchedule({ schedule }: EventScheduleProp) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-2xl flex gap-2 items-center'>
        <ClipboardClock className='text-blue-400' />
        <p>Schedule</p>
      </h1>
      <div className='flex flex-col gap-6'>
        {schedule?.map(item => (
          <div key={item.id} className='flex gap-5 items-center'>
            {/* <CircleSmall size='12px' className='text-sm'/> */}
            <section>
              <span className='flex items-center gap-5'>
                <p className='text-blue-400 font-semibold'>{item.time}</p>
                <h3 className='text-lg font-bold'>{item.title}</h3>
              </span>
              <span className='flex items-center gap-2'>
                <p className=''>{item.location}</p>
                &bull;
                <h3 className=''>{item.description}</h3>
              </span>
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}
