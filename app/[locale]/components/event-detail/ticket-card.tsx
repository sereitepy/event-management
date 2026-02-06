import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils/formatters'
import { CheckCheck, CircleDot, Headset } from 'lucide-react'

interface TicketCardProps {
  price: number
}

export default function TicketCard({ price }: TicketCardProps) {
  return (
    <div className='w-full flex flex-col gap-3 transition-all duration-300 ease-in-out'>
      <Card className='py-5 hover:shadow-md hover:shadow-blue-400/30 w-full md:w-85 lg:w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Select Tickets</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-5'>
          <section className='px-5 py-3 ring-primary ring-2 rounded-md flex items-center justify-between gap-2 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <CircleDot className='text-blue-400' size='20px' />
              <span>
                <h1 className='text-lg font-bold'>General Admission</h1>
                <p className='dark:text-gray-300 text-sm'>
                  Full conference access
                </p>
              </span>
            </div>
            <p className='font-bold text-xl text-blue-400'>
              {formatPrice(price)}
            </p>
          </section>
          <section className='px-5 py-3 ring-border ring rounded-md flex items-center justify-between gap-2 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <CircleDot className='' size='20px' />
              <span>
                <h1 className='text-lg font-bold'>CIP Pass</h1>
                <p className='dark:text-gray-300 text-sm'>
                  Access + Afterparty + Swag
                </p>
              </span>
            </div>
            <p className='font-bold text-xl'>$599</p>
          </section>
          <section className='flex flex-col gap-3'>
            <span className='flex justify-between'>
              <h1>Remaining Capacity</h1>
              <p className='font-semibold text-primary'>12 seats left</p>
            </span>
            <Progress value={85} className='h-2.5' />
            <p className='dark:text-gray-300 flex items-end justify-end text-sm'>
              Selling fast 🔥
            </p>
          </section>
          <Separator />
          <section className='flex flex-col gap-5'>
            <span className='flex justify-between'>
              <h3 className='text-lg font-semibold'>Total</h3>
              <p className='text-4xl font-bold'>{formatPrice(price)}</p>
            </span>
            <Button className='shadow-md shadow-blue-400/30 text-xl h-15 w-full active:bg-accent'>
              <p className='font-bold text-xl'>Attend this Event</p>
              <CheckCheck size='40px' />
            </Button>
          </section>
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
          <p className='text-sm dark:text-gray-300'>Secure the ticket now!</p>
        </CardFooter>
      </Card>
      <Card className='py-3 hover:shadow-md hover:shadow-blue-400/30 transition-colors duration-200 ease-in-out'>
        <CardHeader>
          <div className='flex items-center gap-5'>
            <div className='bg-border p-3 rounded-md'>
              <Headset />
            </div>
            <div className='flex flex-col gap-1'>
              <h3 className='text-lg font-bold'>Need help attending?</h3>
              <span>
                <p className='dark:text-gray-300'>Call our support agent at:</p>
                <p className='text-primary'>+(855) 15-323-502</p>
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
