'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const changeLanguage = (locale: string) => {
    // Redirect to the new locale while preserving the current path
    router.push(`/${locale}${pathname.replace(/^\/(en|km)/, '')}`)
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <span className='fi fi-us'>sd</span>
            <span className='fi fi-kh'></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => changeLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('km')}>
            Khmer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// credits: https://medium.com/@annasaaddev/how-to-implement-language-switching-in-your-website-with-next-js-15-fec85c7199c9#:~:text=//%20components/LanguageSwitcher.tsx,div%3E%0A%20%20)%3B%0A%7D