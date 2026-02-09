'use server'

import { cookies } from 'next/headers'
import { getAuthHeaders } from '../auth'
import { API_BASE_URL } from '../definitions'

export async function createEventAdmin(data: any) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events`, {
      method: 'POST',
      headers: authResult.headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to create event',
      }
    }

    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function getAdminEvents(accessToken: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/events`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  return response.json()
}

export async function updateEventAdmin(id: number, data: any) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events/${id}`, {
      method: 'PUT',
      headers: authResult.headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to update event',
      }
    }

    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function getAdminIndividualEvent(id: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return null
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

