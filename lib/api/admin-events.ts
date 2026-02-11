'use server'

import { EventFormData } from '@/types/event'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { getAuthHeaders } from '../auth'
import { API_BASE_URL } from '../definitions'

export async function createEventAdmin(data: EventFormData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events`, {
      method: 'POST',
      headers: authResult.headers,
      body: JSON.stringify({
        ...data,
        categoryId: parseInt(data.categoryId.toString()),
        price: parseFloat(data.price.toString()),
        capacity: parseInt(data.capacity.toString()),
      }),
    })
    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to create event',
      }
    }
    revalidatePath('/admin/events')
    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function updateEventAdmin(id: string, data: EventFormData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events/${id}`, {
      method: 'PATCH',
      headers: authResult.headers,
      body: JSON.stringify({
        ...data,
        categoryId: parseInt(data.categoryId.toString()),
        price: parseFloat(data.price.toString()),
        capacity: parseInt(data.capacity.toString()),
        startTime:
          data.startTime?.length === 5 ? `${data.startTime}:00` : data.startTime,
        endTime:
          data.endTime?.length === 5 ? `${data.endTime}:00` : data.endTime,
      }),
    })
    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to update event',
      }
    }
    revalidatePath('/admin/events')
    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function getAdminEvents() {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }
  
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/events`, {
    headers: authResult.headers,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  return response.json()
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

    revalidatePath('/admin/events')
    return { success: true }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}
