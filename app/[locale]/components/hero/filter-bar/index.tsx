import { Button } from '@/components/ui/button'
import SearchDate from './search-date'
import SearchEvents from './search-events'
import { SearchLocation } from './search-location'

export default function FilterBar() {
  return (
    <div className='px-5 transition-all ease-in-out delay-75'>
      <div className='md:flex hidden px-2 pl-5 py-2 bg-secondary border-primary-foreground/10 border rounded-lg gap-4'>
        <SearchEvents />
        <div className='border-r-2' />
        <SearchLocation />
        <div className='border-r-2' />
        <div className='pl-2'>
          <SearchDate />
        </div>
        <Button className='font-bold hover:ring-offset-2 hover:ring-primary hover:ring-3 active:bg-accent'>
          Search
        </Button>
      </div>

      <div className='md:hidden px-2 pl-5 pb-5 pt-2 bg-secondary border rounded-lg flex flex-col gap-5 justify-between'>
        <div className='flex items-center gap-4'>
          <SearchEvents />
          <SearchLocation />
        </div>
        <div className='flex items-center gap-4 pr-3'>
          <div className='w-full flex'>
            <SearchDate />
          </div>
          <Button className='font-bold hover:ring-offset-2 hover:ring-primary hover:ring-3 active:bg-accent'>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
