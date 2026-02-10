'use client'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { logout } from '@/lib/api/logout'
import {
  Calendar,
  ChartBarStacked,
  LayoutDashboard,
  LogOut,
  PartyPopper,
  Speech,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AdminLayoutSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/events', icon: PartyPopper, label: 'Events' },
    { href: '/admin/categories', icon: ChartBarStacked, label: 'Categories' },
    { href: '/admin/speakers', icon: Speech, label: 'Speakers' },
  ]

  return (
    <Sidebar className='z-1 bg-secondary'>
      <SidebarHeader className='bg-secondary font-bold text-2xl p-5'>
        <span className='flex items-center gap-2'>
          <Calendar size='18px' /> evenTs
        </span>
      </SidebarHeader>
      <SidebarContent className='bg-secondary'>
        <SidebarGroup className='gap-2'>
          {navItems.map(item => {
            const isActive = pathname.includes(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className='w-full rounded-lg'
              >
                <Button
                  variant='ghost'
                  className={`w-full justify-start ${
                    isActive
                      ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <Icon /> {item.label}
                </Button>
              </Link>
            )
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-secondary p-4 space-y-2'>
        <form action={logout} className='w-full'>
          <Button
            type='submit'
            variant='ghost'
            className='w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive'
          >
            <LogOut />
            Logout
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
