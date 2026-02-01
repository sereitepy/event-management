import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import IndividualEventCard from './individual-event-card'

export default function EventCards() {
  return (
    <div className='bg-secondary p-5 flex flex-col gap-5'>
      <section className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>Upcoming Events</h1>
        <div className='flex items-center gap-5'>
          <p className='text-md font-semibold hidden md:flex'>Sort by:</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='font-semibold text-md'>
                Date (Soonest)
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full'>
              <DropdownMenuGroup>
                <DropdownMenuItem>Next week</DropdownMenuItem>
                <DropdownMenuItem>This week</DropdownMenuItem>
                <DropdownMenuItem>Last week</DropdownMenuItem>
                <DropdownMenuItem>Last week</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      <Separator />
      <section className=''><IndividualEventCard /></section>
    </div>
  )
}
