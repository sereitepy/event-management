import { useTranslations } from 'next-intl'
import Hero from './components/hero'
import EventCards from './components/event-cards'

export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <div className=''>
      <Hero />
      <EventCards />
    </div>
  )
}
