import { cookies } from 'next/headers'
import { logout } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    redirect('/login')
  }

  let user
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )
    user = {
      email: payload.email || 'User',
      username: payload.username || 'User',
      name: payload.name || 'User',
    }
  } catch {
    redirect('/login')
  }

  return (
    <div className='p-6'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          {/* <p className='text-gray-600'>Welcome back, {user?.name}!</p> */}
        </div>
        <form action={logout}>
          <button
            type='submit'
            className='rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700'
          >
            Logout
          </button>
        </form>
      </div>
      <div className='rounded-lg border bg-white p-6'>
        <h2 className='mb-4 text-xl font-semibold'>Your Profile</h2>
        <dl className='space-y-2'>
          <div>
            <dt className='text-sm font-medium text-gray-600'>Username</dt>
            {/* <dd>{user?.username}</dd> */}
          </div>
          <div>
            <dt className='text-sm font-medium text-gray-600'>Email</dt>
            {/* <dd>{user?.email}</dd> */}
          </div>
        </dl>
      </div>
    </div>
  )
}
