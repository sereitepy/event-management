import { EventDetailType } from '@/types/event'
import HeadTitle from './head-title'
import EventDescription from './event-description'
import KeyNoteSpeakers from './keynote-speakers'
import EventSchedule from './schedule'
import EventVenue from './venue'
import TicketCard from './ticket-card'

interface EventDetailComponentProp {
  data: EventDetailType | undefined
}

export default function EventDetailComponent({
  data,
}: EventDetailComponentProp) {
  const title = data?.title
  const category = data?.category
  const image = data?.image
  const start_date = data?.start_date
  const end_date = data?.end_date
  const start_time = data?.start_time
  const end_time = data?.end_time
  const description = data?.description
  const speakers = data?.speakers
  const schedule = data?.schedule
  const location = data?.location
  const google_map_link = data?.google_map_link
  const price = data?.price ?? 0

  return (
    <div className='flex flex-col gap-10'>
      <HeadTitle
        title={title}
        category={category}
        start_date={start_date}
        end_date={end_date}
        start_time={start_time}
        end_time={end_time}
        image={image}
        location={location}
      />
      <div className='flex justify-between gap-10 w-full md:flex-row flex-col relative'>
        <section className='flex flex-col gap-10 flex-1'>
          <EventDescription description={description} />
          {data?.speakers[0] && <KeyNoteSpeakers speakers={speakers} />}
          <EventSchedule schedule={schedule} />
          <EventVenue location={location} google_map_link={google_map_link} />
        </section>
        <section className='md:sticky md:top-20 md:self-start shrink-0'>
          <TicketCard price={price} />
        </section>
      </div>
    </div>
  )
}
