'use server'

import { cookies } from 'next/headers'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'


export async function getAuthHeaders() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return { success: false, headers: null, message: 'Not authenticated' }
  }

  return {
    success: true,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    message: null,
  }
}

export async function deleteEvent(id: number) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return { success: false, message: 'Not authenticated' }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      return { success: false, message: 'Failed to delete event' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}
