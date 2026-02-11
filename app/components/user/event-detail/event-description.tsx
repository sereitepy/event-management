import { Info } from "lucide-react"

interface EventDescriptionProp {
  description: string | undefined
}

export default function EventDescription({ description }: EventDescriptionProp) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-2xl  flex gap-2 items-center'>
        <Info className='text-blue-400' />
        About the Event
      </h1>
      <p className=''>{description ?? 'No Description'}</p>
    </div>
  )
}