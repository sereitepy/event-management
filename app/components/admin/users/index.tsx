'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteUser } from '@/lib/api/user'

interface User {
  id: number,
  username: string
  email: string
  isDeleted: boolean
  profileImage: string | null
}

interface UsersTableProps {
  users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter()
  const [deletingUsername, setDeletingUsername] = useState<string | null>(null)

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-16'>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Profile Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className='h-24 text-center text-muted-foreground'
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow key={user.username}>
                <TableCell className='font-medium text-muted-foreground'>
                  {index + 1}
                </TableCell>
                <TableCell className='font-medium'>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className='text-muted-foreground'>
                  {user.profileImage || 'No image'}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isDeleted
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}
                  >
                    {user.isDeleted ? 'Deleted' : 'Active'}
                  </span>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        router.push(`/admin/users/${user.id}/edit`)
                      }
                    >
                      <Pencil className='h-4 w-4 mr-2' />
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => {
                        setDeletingUsername(user.username)
                        deleteUser(user.id)
                      }}
                      disabled={deletingUsername === user.username}
                    >
                      {deletingUsername === user.username ? (
                        <>
                          <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
