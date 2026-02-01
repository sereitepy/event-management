'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { MapPin } from 'lucide-react'

const locations = [
  'Khan Chamkar Mon',
  'Khan Doun Penh',
  'Khan Prampir Makara',
  'Khan Tuol Kouk',
  'Khan Dangkao',
  'Khan Mean Chey',
  'Khan Russey Keo',
  'Khan Sen Sok',
  'Khan Pou Senchey',
  'Khan Chroy Changvar',
  'Khan Prek Pnov',
  'Khan Chbar Ampov',
  'Khan Boeng Keng Kang',
  'Khan Kambol',
]

export function SearchLocation() {
  return (
    <Combobox items={locations}>
      <div className='flex items-center pl-2'>
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
