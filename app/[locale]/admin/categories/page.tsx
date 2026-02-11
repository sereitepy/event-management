import { Button } from '@/components/ui/button'
import { getCategories } from '@/lib/api/categories'
import { verifyAdminAccess } from '@/lib/auth'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import CategoriesTable from '../../../components/admin/categories'

export default async function AdminCategoriesPage() {
  await verifyAdminAccess()
  const categories = await getCategories()

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Categories</h1>
          <p className='text-muted-foreground'>Manage all event categories</p>
        </div>
        <Link href='/admin/categories/new'>
          <Button>
            <Plus className='h-4 w-4' />
            Create Category
          </Button>
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  )
}
