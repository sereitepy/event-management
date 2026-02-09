import { cookies } from 'next/headers'
import { API_BASE_URL } from '../definitions'

export async function getCategories() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/categories`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}
