import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import IndividualEventCard from './individual-event-card'
import { Event } from '@/types/event'

export const mockEvents: Event[] = [
  {
    id: '2234',
    image:
      'https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg',
    date: '2026-10-24T19:00:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000, // $150.00
    currency: 'USD',
    category: 'Music',
  },
  {
    id: 'sedsrygr',
    image:
      'https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D',
    date: '2026-11-15T20:00:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
  {
    id: 'shrehurt',
    image:
      'https://static.vecteezy.com/ti/photos-gratuite/t2/27104127-applaudissement-foule-illumine-par-vibrant-etape-lumieres-a-concert-photo.jpg',
    date: '2026-12-05T18:30:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
  {
    id: '97ushg',
    image:
      'https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-music-concert-by-night-copy-space_637285-623.jpg',
    date: '2027-01-10T21:00:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
  {
    id: 'sw34urt',
    image:
      'https://static.vecteezy.com/ti/photos-gratuite/t2/27104127-applaudissement-foule-illumine-par-vibrant-etape-lumieres-a-concert-photo.jpg',
    date: '2027-02-14T19:00:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
  {
    id: '97uerythshg',
    image:
      'https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-music-concert-by-night-copy-space_637285-623.jpg',
    date: '2027-03-20T20:30:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
  {
    id: 'sw34uewwwert',
    image:
      'https://static.vecteezy.com/ti/photos-gratuite/t2/27104127-applaudissement-foule-illumine-par-vibrant-etape-lumieres-a-concert-photo.jpg',
    date: '2027-04-08T18:00:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
  {
    id: '97ueryeyhe5yhethshg',
    image:
      'https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-music-concert-by-night-copy-space_637285-623.jpg',
    date: '2027-05-12T19:30:00Z',
    title: 'Neon Nights Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: 15000,
    currency: 'USD',
    category: 'Music',
  },
]

export default function EventCards() {
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
      <section className='flex items-center justify-center pt-2 w-full'>
        <IndividualEventCard data={mockEvents} />
      </section>
    </div>
  )
}
