'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CalendarCheck2 } from 'lucide-react'
import { useState } from 'react'

export default function SearchDate() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='flex justify-end items-center'>
          <div className='flex items-center gap-1'>
            <CalendarCheck2 size='18px' color='gray' />
            <Button className='border-0 shadow-none px-2 bg-secondary hover:bg-secondary text-black dark:text-white md:w-52'>
              {date
                ? date?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Any Date'}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-0 p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-lg border'
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
