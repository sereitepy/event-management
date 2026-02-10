import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminLayoutSidebar } from '../../components/admin/layout-sidebar'
import { getValidAccessToken } from '@/lib/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
  const accessToken = await getValidAccessToken()

  let adminEmail
  if (accessToken) {
    try {
      const payload = JSON.parse(
        Buffer.from(accessToken.split('.')[1], 'base64').toString()
      )
      adminEmail = payload.sub
    } catch {}
  }
  return (
    <SidebarProvider>
      <div className='flex w-full relative'>
        <AdminLayoutSidebar />
        <main className='flex-1 w-full'>
          <div className='sticky top-0 z-10 bg-secondary border-b p-4 flex items-center justify-between'>
            <SidebarTrigger />
            <div className='flex items-center gap-3 pr-7'>
              <Avatar className='h-8 w-8'>
                <AvatarFallback>
                  {adminEmail?.[0]?.toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium truncate'>
                  {adminEmail || 'Admin'}
                </p>
                <p className='text-xs text-muted-foreground'>Administrator</p>
              </div>
            </div>
          </div>
          <div className='p-4 max-w-425 bg-secondary'>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
