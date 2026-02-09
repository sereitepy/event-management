'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getEventsAdmin } from '@/app/actions/admin-events'
import { deleteEvent } from '@/lib/api/admin-events'

interface Event {
  id: number
  title: string
  categoryName: string
  startDate: string
  location: string
  price: number
  capacity: number
  status: string
}

// async function deleteEvent(id: number) {
//   try {
//     const res = await fetch(`/api/admin/events/${id}`, {
//       method: 'DELETE',
//     })

//     if (!res.ok) {
//       const error = await res.json()
//       return {
//         success: false,
//         message: error.message || 'Failed to delete event',
//       }
//     }

//     return { success: true }
//   } catch (error) {
//     return {
//       success: false,
//       message: 'An error occurred while deleting the event',
//     }
//   }
// }

export function EventsTable({ events }: { events: Event[] }) {
  const [deletingId, setDeletingId] = useState<number>()

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-20'>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className='text-right'>Price</TableHead>
            <TableHead className='text-center'>Capacity</TableHead>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='text-right w-35'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className='h-24 text-center text-muted-foreground'
              >
                No events found
              </TableCell>
            </TableRow>
          ) : (
            events.map(event => (
              <TableRow key={event.id}>
                <TableCell className='font-mono text-sm text-muted-foreground'>
                  {event.id}
                </TableCell>
                <TableCell className='font-medium max-w-50 truncate'>
                  {event.title}
                </TableCell>
                <TableCell>
                  <Badge variant='outline'>{event.categoryName}</Badge>
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {new Date(event.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell className='max-w-37.5 truncate text-sm text-muted-foreground'>
                  {event.location}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  ${event.price.toFixed(2)}
                </TableCell>
                <TableCell className='text-center text-sm'>
                  {event.capacity}
                </TableCell>
                <TableCell className='text-center'>
                  <Badge
                    variant={
                      event.status === 'PUBLISHED'
                        ? 'default'
                        : event.status === 'DRAFT'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Button variant='ghost' size='sm'>
                        <Edit className='h-4 w-4 mr-2' />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        setDeletingId(event.id) 
                        deleteEvent(event.id)
                      }}
                      disabled={deletingId === event.id}
                    >
                      {deletingId === event.id ? (
                        <Loader2 className='h-4 w-4 text-destructive animate-spin' />
                      ) : (
                        <Trash2 className='h-4 w-4 text-destructive' />
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
