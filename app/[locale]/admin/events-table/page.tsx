'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import { deleteEvent } from '@/app/actions/admin'
import { Badge } from '@/components/ui/badge'

interface Event {
  id: number
  title: string
  startDate: string
  endDate: string
  location: string
  price: number
  capacity: number
  status: string
  categoryName: string
  category: {
    name: string
  }
}

export function EventsTable({ events }: { events: Event[] }) {
  const [eventsList, setEventsList] = useState(events)

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const result = await deleteEvent(id)
      if (result.success) {
        setEventsList(eventsList.filter(e => e.id !== id))
      } else {
        alert(result.message)
      }
    }
  }

  return (
    <div className='border rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventsList.map(event => (
            <TableRow key={event.id}>
              <TableCell className='font-medium'>{event.title}</TableCell>
              <TableCell>{event.categoryName}</TableCell>
              <TableCell>
                {new Date(event.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>${event.price.toFixed(2)}</TableCell>
              <TableCell>{event.capacity}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status === 'PUBLISHED' ? 'default' : 'secondary'
                  }
                >
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <Button variant='ghost' size='sm'>
                      <Edit className='h-4 w-4' />
                    </Button>
                  </Link>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className='h-4 w-4 text-destructive' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
