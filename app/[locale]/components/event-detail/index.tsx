import { EventDetailType } from '@/types/event'
import HeadTitle from './head-title'
import EventDescription from './event-description'
import KeyNoteSpeakers from './keynote-speakers'
import EventSchedule from './schedule'
import EventVenue from './venue'

interface EventDetailComponentProp {
  data: EventDetailType | undefined
}
export default function EventDetailComponent({
  data,
}: EventDetailComponentProp) {
  return (
    <div>
      <section className='flex flex-col gap-10'>
        <HeadTitle data={data} />
        <EventDescription data={data} />
        {!data?.speakers[0] ? '' : <KeyNoteSpeakers data={data} />}
        <EventSchedule data={data} />
        <EventVenue
          location={data?.location}
          google_map_link={data?.google_map_link}
        />
      </section>
      <section>
        
      </section>
    </div>
  )
}
