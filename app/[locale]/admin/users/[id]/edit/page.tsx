import UserForm from '@/app/components/admin/users/user-form'
import { getUserById } from '@/lib/api/user'
import { redirect } from 'next/navigation'

export default async function EditUserPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const result = await getUserById(id)

  if (!result.success || !result.data) {
    redirect('/admin/users')
  }

  return <UserForm mode='update' defaultValues={result.data} userId={id} />
}
