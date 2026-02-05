import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return null
  }

  try {
    // Call your backend to verify the token
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const user = await response.json()
    return user
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
