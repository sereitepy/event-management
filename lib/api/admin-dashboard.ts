import { getAuthHeaders } from "../auth"
import { API_BASE_URL } from "../definitions"

export async function getDashboardData() {
   const authResult = await getAuthHeaders()
    if (!authResult.success) {
      return { success: false, message: authResult.message }
    }
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard`, {
    headers: authResult.headers,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data')
  }

  return response.json()
}
