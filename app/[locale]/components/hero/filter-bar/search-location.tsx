'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { EventDetailType } from '@/types/event'
import { MapPin } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

const locations = [
  'Chamkar Mon',
  'Doun Penh',
  'Prampir Makara',
  'Tuol Kouk',
  'Dangkao',
  'Mean Chey',
  'Russey Keo',
  'Sen Sok',
  'Pou Senchey',
  'Chroy Changvar',
  'Prek Pnov',
  'Chbar Ampov',
  'Boeng Keng Kang',
  'Kambol',
]

interface SearchLocationProps {
  value: string
  onChange: (value: string) => void
}

export function SearchLocation({ value, onChange }: SearchLocationProps) {
  return (
    <Combobox
      items={locations}
      value={value}
      onValueChange={val => onChange(val || '')}
    >
      <div className='flex items-center pl-2 md:w-45'>
        <MapPin size='20px' color='gray' />
        <ComboboxInput
          className='border-0 shadow-none text-md'
          placeholder='Search location...'
        />
      </div>
      <ComboboxContent className='w-full'>
        <ComboboxEmpty>No location found...</ComboboxEmpty>
        <ComboboxList>
          {item => (
            <ComboboxItem key={item} value={item} className='cursor-pointer'>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
