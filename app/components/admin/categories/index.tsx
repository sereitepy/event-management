'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2, Loader2 } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { deleteCategory } from '@/lib/api/categories'

interface Category {
  id: number
  name: string
  description: string
}

interface CategoriesTableProps {
  categories: Category[]
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-25'>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className='h-24 text-center text-muted-foreground'
              >
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categories.map(category => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{category.id}</TableCell>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell className='text-muted-foreground'>
                  {category.description}
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex justify-end gap-2'>
                    <Link href={`/admin/categories`}></Link>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        router.push(`/admin/categories/${category.id}/edit`)
                      }
                    >
                      <Pencil className='h-4 w-4 mr-2' />
                      Edit
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => {
                        setDeletingId(category.id)
                        deleteCategory(category.id)
                      }}
                      disabled={deletingId === category.id}
                    >
                      {deletingId === category.id ? (
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
