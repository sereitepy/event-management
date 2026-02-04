import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchEventsProps {
  value: string
  onChange: (value: string) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
}

export default function SearchEvents({
  value,
  onChange,
  onKeyPress,
}: SearchEventsProps) {
  return (
    <div className='flex items-center'>
      <Search size='20px' color='gray' />
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        className='border-0 shadow-none text-md truncate md:w-40 lg:w-55'
        placeholder='Events, artists, or teams'
      />
    </div>
  )
}
