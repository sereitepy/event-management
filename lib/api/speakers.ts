import { cookies } from "next/headers";
import { API_BASE_URL } from "../definitions";

export async function getSpeakers() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/speakers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch speakers:', response.status)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch speakers:', error)
    return []
  }
}
