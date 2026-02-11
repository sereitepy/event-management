'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Trash2, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteSpeaker } from '@/lib/api/speakers'

interface Speaker {
  bio: string
  company: string
  fullName: string
  imageUrl: string
  title: string
}

interface SpeakersTableProps {
  speakers: Speaker[]
}

export default function SpeakersTable({ speakers }: SpeakersTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number, name: string) => {
    setDeletingId(id)
    try {
      await deleteSpeaker(id)
      router.refresh()
    } catch (error) {
      console.error('Failed to delete speaker:', error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-16'>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speakers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className='h-24 text-center text-muted-foreground'
              >
                No speakers found
              </TableCell>
            </TableRow>
          ) : (
            speakers.map((speaker, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium text-muted-foreground'>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className='relative w-12 h-12 rounded-full overflow-hidden bg-muted'>
                    {speaker.imageUrl ? (
                      <Image
                        src={speaker.imageUrl}
                        alt={speaker.fullName}
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <User className='w-6 h-6 text-muted-foreground' />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  {speaker.fullName}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {speaker.title}
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {speaker.company}
                </TableCell>
                <TableCell className='max-w-xs'>
                  <p className='line-clamp-2 text-sm text-muted-foreground'>
                    {speaker.bio}
                  </p>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        router.push(`/admin/speakers/${index + 1}/edit`)
                      }
                    >
                      <Pencil className='h-4 w-4 mr-2' />
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(index + 1, speaker.fullName)}
                      disabled={deletingId === index + 1}
                    >
                      {deletingId === index + 1 ? (
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
