import { EventDetailType } from "@/types/event"
import { Info } from "lucide-react"

interface EventDescriptionProp {
  data: EventDetailType | undefined
}

export default function EventDescription({ data }: EventDescriptionProp) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='font-bold text-2xl  flex gap-2 items-center'>
        <Info className="text-blue-400"/>
        About the Event
      </h1>
      <p className=''>{data?.description ?? 'No Description'}</p>
    </div>
  )
}