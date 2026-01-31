import { useTranslations } from 'next-intl'
import Hero from './components/hero'

export default function Home() {
  const t = useTranslations('HomePage')
  return (
    <div className=''>
      {/* <h1>{t('title')}</h1> */}
      <Hero />
    </div>
  )
}
