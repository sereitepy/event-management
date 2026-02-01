import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

const data = [
  {
    id: '2234',
    image: 'https://i.guim.co.uk/img/media/dc60c2216c6230eeb2eaf2ffecc6c7452b771820/0_54_4096_2457/master/4096.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2f042b586d8d264e64c6417dd156716b',
    date: 'dsdg',
    title: 'Neon Nigts Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: '$150',
    category: 'Music',
  },
  {
    id: 'sedsrygr',
    image: 'https://i.guim.co.uk/img/media/dc60c2216c6230eeb2eaf2ffecc6c7452b771820/0_54_4096_2457/master/4096.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2f042b586d8d264e64c6417dd156716b',
    date: 'dsdg',
    title: 'Neon Nigts Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: '$150',
    category: 'Music',
  },
  {
    id: 'shrehurt',
    image: 'https://i.guim.co.uk/img/media/dc60c2216c6230eeb2eaf2ffecc6c7452b771820/0_54_4096_2457/master/4096.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2f042b586d8d264e64c6417dd156716b',
    date: 'dsdg',
    title: 'Neon Nigts Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: '$150',
    category: 'Music',
  },
  {
    id: '97ushg',
    image: 'https://i.guim.co.uk/img/media/dc60c2216c6230eeb2eaf2ffecc6c7452b771820/0_54_4096_2457/master/4096.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2f042b586d8d264e64c6417dd156716b',
    date: 'dsdg',
    title: 'Neon Nigts Festival 2026',
    location: 'Koh Norea, Koh Pich',
    price: '$150',
    category: 'Music',
  },
]

export default function IndividualEventCard() {
  return (
    <div className='flex items-center gap-5 justify-center'>
      {data.map(item => {
        return (
          <div key={item.id} className=''>
            <Card className='w-80 pt-0'>
              <div className='w-full'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className='rounded-t-md w-full object-cover'
                />
              </div>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
