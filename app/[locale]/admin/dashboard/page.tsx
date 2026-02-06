import { getDashboardData } from '@/app/actions/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { verifyAdminAccess } from '@/lib/auth'
import { Calendar, Mic, Tag, Users } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function AdminDashboard() {
  const accessToken = await verifyAdminAccess()

  let admin
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )
    admin = {
      email: payload.sub || 'Admin',
      scope: payload.scope,
    }
  } catch {
    redirect('/login')
  }

  let dashboardData
  try {
    dashboardData = await getDashboardData(accessToken)
  } catch (error) {
    console.error('Error fetching dashboard:', error)
    dashboardData = null
  }

  const adminSections = [
    {
      title: 'Events',
      description: 'Manage all events',
      icon: Calendar,
      href: '/admin/events',
      count: dashboardData?.totalEvents || 0,
    },
    {
      title: 'Users',
      description: 'Manage users',
      icon: Users,
      href: '/admin/users',
      count: dashboardData?.totalUsers || 0,
    },
    {
      title: 'Categories',
      description: 'Manage event categories',
      icon: Tag,
      href: '/admin/categories',
      count: dashboardData?.totalCategories || 0,
    },
    {
      title: 'Speakers',
      description: 'Manage speakers',
      icon: Mic,
      href: '/admin/speakers',
      count: dashboardData?.totalSpeakers || 0,
    },
  ]

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Admin Dashboard</h1>
        <p className='text-muted-foreground'>Welcome back, {admin.email}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {adminSections.map(section => {
          const Icon = section.icon
          return (
            <Link key={section.href} href={section.href}>
              <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {section.title}
                  </CardTitle>
                  <Icon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{section.count}</div>
                  <p className='text-xs text-muted-foreground'>
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {dashboardData?.mostPopularEvents && (
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Events</CardTitle>
            <CardDescription>
              Events with the highest attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {dashboardData.mostPopularEvents.map((item: any) => (
                <div
                  key={item.event.id}
                  className='flex items-center justify-between p-4 border rounded-lg'
                >
                  <div>
                    <h3 className='font-semibold'>{item.event.title}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {item.event.location} • {item.event.startDate}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold'>{item.attendeeCount} attendees</p>
                    <p className='text-sm text-muted-foreground'>
                      ${item.event.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
