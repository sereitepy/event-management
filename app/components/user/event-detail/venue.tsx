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
          src={
            
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31270.03838695468!2d104.87694708683821!3d11.569427722409744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951725d8c4835%3A0x2047e2df9364f385!2sToul%20Kork%20District%2C%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1770382087168!5m2!1sen!2skh'
          }
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
