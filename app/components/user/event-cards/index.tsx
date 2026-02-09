import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Event } from '@/types/event'
import EventCard from './event-card'

interface EventCardsProps {
  events: Event[]
}

export default function EventCards({ events }: EventCardsProps) {
  return (
    <div className='bg-secondary p-3 flex flex-col gap-3 px-4 md:px-6 2xl:px-0'>
      <div>
        <section className='flex items-center justify-between max-w-325 mx-auto'>
          <h1 className='text-lg font-bold'>Upcoming Events</h1>
          <div className='flex items-center gap-5'>
            <p className='text-md font-semibold hidden md:flex'>Sort by:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='font-semibold text-md'>
                  Date (Soonest)
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width]'>
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
      </div>
      <Separator className='max-w-325 mx-auto' />
      <section className='flex md:items-center md:justify-center pt-2 w-full'>
        <div className='max-w-325 mx-auto'>
          <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {events.map(event => (
              <EventCard key={event.id} data={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
