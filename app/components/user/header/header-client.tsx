'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './mode-toggle'
import LanguageSwitcher from './language-switcher'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface User {
  email: string
  isAdmin: boolean
}

interface HeaderClientProps {
  user: User | null
  locale: string | 'en' | 'km'
}

export default function HeaderClient({ user, locale }: HeaderClientProps) {
  const pathname = usePathname()

  const shouldHide =
    pathname.includes('/admin') ||
    pathname.includes('/login') ||
    pathname.includes('/signup')

  if (shouldHide) return null

  return (
    <div className='flex justify-between px-6 2xl:px-0 py-3 items-center max-w-325 mx-auto'>
      <Link href={'/'}>
        <div className='text-xl font-extrabold items-center'>evenTs</div>
      </Link>
      <div className='flex items-center gap-3'>
        <ModeToggle />
        <LanguageSwitcher locale={locale} />
        {user ? (
          // Logged in user
          <Link href={user.isAdmin ? '/admin/dashboard' : '/profile'}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <span className='font-medium hidden sm:inline'>
                {user.email.split('@')[0]}
              </span>
              <Avatar>
                <AvatarFallback>
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </Link>
        ) : (
          <>
            <Link href={'/login'}>
              <Button className='font-bold' variant='secondary'>
                Login
              </Button>
            </Link>
            <Link href={'/signup'}>
              <Button className='font-bold'>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
