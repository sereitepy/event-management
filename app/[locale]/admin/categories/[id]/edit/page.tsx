import { getCategoryById } from '@/lib/api/categories'
import CategoryForm from '../../../../../components/admin/categories/categories-form'
import { redirect } from 'next/navigation'

export default async function AdminEditCategory({
  params,
}: {
  params: { id: number }
}) {
  const { id } = await params
  const categories = await getCategoryById(id)
  if (!categories) {
    redirect('/admin/categories')
  }
  return (
    <div>
      <CategoryForm mode='edit' initialData={categories} />
    </div>
  )
}
