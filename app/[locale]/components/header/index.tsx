import { Button } from '@/components/ui/button'
import LanguageSwitcher from './language-switcher'
import { ModeToggle } from './mode-toggle'

interface HeaderProps {
  locale: string | 'en' | 'km'
}

export default function Header({ locale }: HeaderProps) {
  return (
    <div className='flex justify-between px-6 py-3 border items-center'>
      <div className='text-xl font-extrabold items-center '>EvenTs</div>
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
