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
  const speakerss = data?.speakers
  const speakers = [
    {
      id: 'sp1',
      name: 'David Chen',
      title: 'CEO',
      company: 'FutureTech',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'David is a pioneer in AI research with over 15 years of experience leading innovation at top tech companies.',
    },
    {
      id: 'sp2',
      name: 'Sarah Miller',
      title: 'Head of AI',
      company: 'Nexus',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Sarah leads AI development at Nexus and has published over 50 papers on machine learning.',
    },
    {
      id: 'sp3',
      name: 'James Wilson',
      title: 'VP Engineering',
      company: 'CloudCo',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'James specializes in cloud infrastructure and has built systems serving millions of users.',
    },
    {
      id: 'sp4',
      name: 'Emily Zhang',
      title: 'Founder',
      company: 'GreenWeb',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      bio: 'Emily founded GreenWeb to make sustainable computing accessible to startups worldwide.',
    },
  ]
  const schedule = [
    {
      id: 'sch1',
      time: '09:00 AM',
      title: 'Registration & Breakfast',
      description: 'Networking and light refreshments served',
      location: 'Main Lobby',
    },
    {
      id: 'sch2',
      time: '10:00 AM',
      title: 'Opening Keynote: The Age of AI',
      description: 'David Chen, CEO of FutureTech',
      location: 'Grand Hall',
      speaker: 'David Chen',
    },
    {
      id: 'sch3',
      time: '11:30 AM',
      title: 'Workshop: Building Sustainable Clouds',
      description: 'Practical session on green computing',
      location: 'Room 204',
    },
    {
      id: 'sch4',
      time: '13:00 PM',
      title: 'Networking Lunch',
      description: 'Connect with fellow attendees',
      location: 'Terrace Level',
    },
    {
      id: 'sch5',
      time: '14:30 PM',
      title: 'Panel: Future of Web3',
      description: 'Industry leaders discuss decentralization',
      location: 'Main Stage',
    },
    {
      id: 'sch6',
      time: '16:00 PM',
      title: 'Breakout Sessions',
      description: 'Various Rooms • Choose from 8 specialized tracks',
      location: 'Various Rooms',
    },
    {
      id: 'sch7',
      time: '17:30 PM',
      title: 'Closing Remarks & Networking',
      description: 'Day 1 wrap-up and evening reception',
      location: 'Grand Hall',
    },
  ]
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
          {speakers && <KeyNoteSpeakers speakers={speakers} />}
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
