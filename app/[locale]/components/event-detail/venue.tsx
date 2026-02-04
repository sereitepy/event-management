import { Building } from 'lucide-react'

interface EventVenueProp {
  location: string | undefined
  google_map_link: string | undefined
}

export default function EventVenue({
  location,
  google_map_link,
}: EventVenueProp) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-2xl flex gap-2 items-center'>
        <Building className='text-blue-400' />
        <p>Venue</p>
      </h1>
      <p className='text-lg font-bold'>{location}</p>
      <div
        className='w-full border rounded-lg overflow-hidden transition-all duration-300 ease-in-out'
        style={{ height: '400px' }}
      >
        <iframe
          src={google_map_link}
          width='100%'
          height='100%'
          style={{ border: 0 }}
          loading='eager'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  )
}
