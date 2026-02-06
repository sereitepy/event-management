'use server'

import { getAuthHeaders } from './admin'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'

export async function getEventsAdmin(accessToken: string) {
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

export async function getEventByIdAdmin(id: number) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events/${id}`, {
      headers: authResult.headers,
    })

    if (!response.ok) {
      return { success: false, message: 'Failed to fetch event' }
    }

    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function deleteEventAdmin(id: number) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events/${id}`, {
      method: 'DELETE',
      headers: authResult.headers,
    })

    if (!response.ok) {
      return { success: false, message: 'Failed to delete event' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function getCategoriesAdmin() {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/categories`, {
      headers: authResult.headers,
      cache: 'no-store',
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      return {
        success: false,
        message: error.message || 'Failed to fetch categories',
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while fetching categories',
    }
  }
}