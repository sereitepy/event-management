import { EventDetailType } from '@/types/event'
import { Mic } from 'lucide-react'
import Image from 'next/image'

interface KeynoteSpeakersProp {
  data: EventDetailType | undefined
}

export default function KeynoteSpeakers({ data }: KeynoteSpeakersProp) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-2xl flex gap-2 items-center'>
        <Mic className='text-blue-400' />
        <p>{data?.speakers ? 'Keynote Speakers' : ''}</p>
      </h1>

      <div className='flex items-center gap-5 flex-wrap'>
        {data?.speakers
          ? data?.speakers.map(item => (
              <div key={item.id} className='flex items-center gap-2'>
                <section className='flex flex-col gap-2'>
                  <div className='overflow-hidden rounded-md'>
                    <Image
                      src={item.image ?? ''}
                      alt={item.name}
                      width={100}
                      height={100}
                      className='w-full h-full rounded-md transition-all ease-in-out duration-300 hover:scale-110'
                    />
                  </div>
                  <div>
                    <p className='text-lg font-bold'>{item.name}</p>
                    <p className='text-blue-400'>{item.title}</p>
                  </div>
                </section>
              </div>
            ))
          : ''}
      </div>
    </div>
  )
}
