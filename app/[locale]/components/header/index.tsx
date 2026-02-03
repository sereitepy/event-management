import { Button } from '@/components/ui/button'
import LanguageSwitcher from './language-switcher'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

interface HeaderProps {
  locale: string | 'en' | 'km'
}

export default function Header({ locale }: HeaderProps) {
  return (
    <div className='flex justify-between px-5 2xl:px-0 py-3 items-center max-w-325 mx-auto'>
      <div className='text-xl font-extrabold items-center '>evenTs</div>
      <div className='flex items-center gap-3'>
        <ModeToggle />
        <LanguageSwitcher locale={locale} />
        <Button className='font-bold' variant='secondary'>
          Login
        </Button>
        <Button className='font-bold'>Sign Up</Button>
      </div>
    </div>
  )
}
