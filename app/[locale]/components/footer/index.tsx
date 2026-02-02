import { Separator } from '@/components/ui/separator'
import { InstagramLogoIcon, XLogoIcon } from '@phosphor-icons/react/ssr'

export default function Footer() {
  const footerItem = [
    {
      id: 'platform',
      title: 'Platform',
      itemOne: 'Browse Events',
      itemTwo: 'Create Events',
      itemThree: 'Organizers',
    },
    {
      id: 'support',
      title: 'Support',
      itemOne: 'Help Center',
      itemTwo: 'Terms of Service',
      itemThree: 'Privacy Policy',
    },
  ]

  return (
    <div className='bg-background flex flex-col gap-5 items-center px-15 pt-10 border-t'>
      <section className='flex items-start justify-between gap-10 w-full'>
        <section className='flex flex-col gap-3'>
          <p className='font-bold text-2xl'>evenTs</p>
          <p className='text-gray-300'>
            Connecting people through unforgettable experiences. Discover, book,
            and go.
          </p>
        </section>
        <section className='flex items-start justify-between gap-10  lg:gap-15 xl:gap-30'>
          {footerItem.map(item => (
            <div key={item.id} className='flex flex-col gap-2 lg:w-32'>
              <h3 className='font-bold text-xl pb-2'>{item.title}</h3>
              <p className='hover:font-semibold hover:cursor-pointer text-gray-300'>
                {item.itemOne}
              </p>
              <p className='hover:font-semibold hover:cursor-pointer text-gray-300'>
                {item.itemTwo}
              </p>
              <p className='hover:font-semibold hover:cursor-pointer text-gray-300'>
                {item.itemThree}
              </p>
            </div>
          ))}
        </section>
        <section className='flex flex-col gap-4'>
          <h3 className='font-bold text-lg'>Follow us</h3>
          <span className='flex gap-2'>
            <InstagramLogoIcon
              size={24}
              className='hover:cursor-pointer'
              color='#d1d5dc'
            />
            <XLogoIcon
              size={24}
              className='hover:cursor-pointer'
              color='#d1d5dc'
            />
          </span>
        </section>
      </section>

      <section className='flex flex-col gap-5 w-full align-start py-5 text-gray-200 text-sm'>
        <Separator />
        <p>@2026 All rights reserved</p>
      </section>
    </div>
  )
}
