import { API_BASE_URL } from "../definitions"

export async function getDashboardData(accessToken: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data')
  }

  return response.json()
}
