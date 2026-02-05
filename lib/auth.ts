import { cookies } from 'next/headers'
import { mockAuthAPI } from './mock-api/auth'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return null
  }

  try {
    const result = await mockAuthAPI.verifyToken(accessToken)
    return result.user
  } catch (error) {
    // Token invalid or expired
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    const { redirect } = await import('next/navigation')
    redirect('/login')
  }

  return user
}
