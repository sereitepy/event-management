import CategoryForm from '@/app/components/admin/categories/categories-form'
import { getCategories } from '@/lib/api/categories'
import { verifyAdminAccess } from '@/lib/auth'

export default async function NewCategoryPage() {
  await verifyAdminAccess()

  return <CategoryForm mode='create' />
}
