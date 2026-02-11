import UserForm from '@/app/components/admin/users/user-form'
import { verifyAdminAccess } from '@/lib/auth'

export default async function NewUserPage() {
  await verifyAdminAccess()
  return <UserForm mode='create' />
}
