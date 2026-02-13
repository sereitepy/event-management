'use server'

import { CreateSpeakerData, Speaker } from '@/types/speaker'
import { getAuthHeaders } from '../auth'
import { API_BASE_URL } from '../definitions'
import { revalidatePath } from 'next/cache'

export async function getSpeakers() {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: [] }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/speakers`, {
      headers: authResult.headers,
      cache: 'no-store',
    })

    if (!response.ok) {
      return { success: false, message: 'Failed to fetch speakers', data: [] }
    }

    const data = await response.json()
    return { success: true, data: data as Speaker[] }
  } catch (error) {
    console.error('Failed to fetch speakers:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
      data: [],
    }
  }
}

export async function getSpeakerById(id: number) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/speakers/${id}`,
      {
        headers: authResult.headers,
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch speaker:', response.status)
      return { success: false, message: 'Failed to fetch speaker', data: null }
    }

    const data = await response.json()
    return { success: true, data: data as Speaker }
  } catch (error) {
    console.error('Failed to fetch speaker:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
      data: null,
    }
  }
}

export async function createSpeaker(data: CreateSpeakerData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/speakers`, {
      method: 'POST',
      headers: authResult.headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      let errorMessage = 'Failed to create speaker'
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      return {
        success: false,
        message: errorMessage,
        data: null,
      }
    }

    const responseData = await response.json()
    revalidatePath('/admin/speakers')
    return { success: true, data: responseData }
  } catch (error) {
    console.error('Create speaker error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
      data: null,
    }
  }
}

export async function updateSpeaker(id: number, data: CreateSpeakerData) {

  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/speakers/${id}`,
      {
        method: 'PUT',
        headers: {
          ...authResult.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      let errorMessage = 'Failed to update speaker'
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      return {
        success: false,
        message: errorMessage,
      }
    }

    const responseData = await response.json()
    revalidatePath('/admin/speakers')
    return { success: true, data: responseData }
  } catch (error) {
    console.error('Update speaker error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function deleteSpeaker(id: number) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/speakers/${id}`,
      {
        method: 'DELETE',
        headers: authResult.headers,
      }
    )

    if (!response.ok) {
      let errorMessage = 'Failed to delete speaker'
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }

      return {
        success: false,
        message: errorMessage,
      }
    }

    revalidatePath('/admin/speakers')
    return { success: true }
  } catch (error) {
    console.error('Delete speaker error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}
