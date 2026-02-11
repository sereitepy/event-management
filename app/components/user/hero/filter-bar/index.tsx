'use client'

import { Button } from '@/components/ui/button'
import SearchDate from './search-date'
import SearchEvents from './search-events'
import { SearchLocation } from './search-location'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useMemo } from 'react'

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // state to store from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined
  )

  const hasChanges = useMemo(() => {
    const urlSearch = searchParams.get('search') || ''
    const urlLocation = searchParams.get('location') || ''
    const urlDate = searchParams.get('date') || ''
    const currentDate = date?.toISOString().split('T')[0] || ''

    return (
      search !== urlSearch ||
      location !== urlLocation ||
      currentDate !== urlDate
    )
  }, [search, location, date, searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (search) params.set('search', search)
    if (location) params.set('location', location)
    if (date) params.set('date', date.toISOString().split('T')[0])

    router.push(`?${params.toString()}`)
  }

  // Handle search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='px-4 transition-all ease-in-out delay-75'>
      {/* Desktop */}
      <div className='md:flex hidden px-2 pl-5 py-2 bg-secondary border-primary-foreground/10 border rounded-lg gap-4'>
        <SearchEvents
          value={search}
          onChange={setSearch}
          onKeyPress={handleKeyPress}
        />
        <div className='border-r-2 border-accent-foreground/20' />
        <SearchLocation
          value={location}
          onChange={value => setLocation(value || '')}
        />
        <div className='border-r-2 border-accent-foreground/20' />
        <div className='pl-2'>
          <SearchDate date={date} onDateChange={setDate} />
        </div>
        <Button
          onClick={handleSearch}
          className={`font-bold transition-all ${
            hasChanges
              ? 'ring-2 ring-primary ring-offset-2 animate-pulse'
              : 'hover:ring-offset-2 hover:ring-primary hover:ring-2'
          } active:bg-accent`}
        >
          Search
        </Button>
      </div>

      {/* Mobile */}
      <div className='md:hidden px-2 pl-5 pb-4 pt-2 bg-secondary border rounded-lg flex flex-col gap-2 justify-between'>
        <div className='flex items-center gap-4'>
          <SearchEvents
            value={search}
            onChange={setSearch}
            onKeyPress={handleKeyPress}
          />
          <SearchLocation
            value={location}
            onChange={value => setLocation(value || '')}
          />
        </div>
        <div className='flex items-center gap-4 pr-3'>
          <div className='w-full flex'>
            <SearchDate date={date} onDateChange={setDate} />
          </div>
          <Button
            onClick={handleSearch}
            className={`font-bold transition-all ${
              hasChanges
                ? 'ring-2 ring-primary ring-offset-2 animate-pulse'
                : 'hover:ring-offset-2 hover:ring-primary hover:ring-2'
            } active:bg-accent`}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
