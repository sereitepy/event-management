import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchEvents() {
  return (
    <div className='flex items-center'>
      <Search size='20px' color='gray' />
      <Input
        className='border-0 shadow-none text-md truncate bg-secondary'
        placeholder='Events, artists, or teams'
      />
    </div>
  )
}
