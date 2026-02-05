import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../components/profile'

type Props = {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className='flex w-full relative'>
        <AppSidebar />
        <main className='flex-1 w-full'>
          <div className='sticky top-0 z-10 bg-secondary border-b p-4'>
            <SidebarTrigger />
          </div>
          <div className='p-4 max-w-425'>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
