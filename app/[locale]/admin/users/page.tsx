import UsersTable from '@/app/components/admin/users'
import { Button } from '@/components/ui/button'
import { getUsers } from '@/lib/api/user'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function UserPage() {
  const users = await getUsers()

  return (
    <div className='max-w-7xl mx-auto px-6  flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Users</h1>
          <p className='text-muted-foreground'>Manage all users</p>
        </div>
        <Link href='/admin/users/new'>
          <Button>
            <Plus className='h-4 w-4' />
            Create User
          </Button>
        </Link>
      </div>

      <UsersTable users={users} />
    </div>
  )
}