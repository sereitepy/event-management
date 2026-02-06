'use client'

import { usePathname } from 'next/navigation'

export function useHideHeaderFooter() {
  const pathname = usePathname()

  return (
    pathname.includes('/admin') ||
    pathname.includes('/login') ||
    pathname.includes('/signup')
  )
}
