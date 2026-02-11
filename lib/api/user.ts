'use server'

import { revalidatePath } from 'next/cache'
import { getAuthHeaders } from '../auth'
import { API_BASE_URL, CreateUserData, UpdateUserData } from '../definitions'

export async function getUsers() {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return [] 
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
      headers: authResult.headers,
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch users:', response.status)
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }
}

export async function getUserById(id: string) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/${id}`, {
      headers: authResult.headers,
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch user:', response.status)
      return { success: false, message: 'Failed to fetch user', data: null }
    }

    const data = await response.json()

    const userData = {
      username: data.username,
      gender: data.gender as 'MALE' | 'FEMALE' | 'OTHER',
      dob: new Date(data.dob),
      email: data.email,
      password: '',
      confirmedPassword: '',
    }

    return { success: true, data: userData }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
      data: null,
    }
  }
}

export async function createUser(data: CreateUserData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
      method: 'POST',
      headers: authResult.headers,
      body: JSON.stringify({
        username: data.username,
        gender: data.gender,
        dob: data.dob.toISOString(),
        email: data.email,
        password: data.password,
        confirmedPassword: data.confirmedPassword,
      }),
    })

    if (!response.ok) {
      let errorMessage = 'Failed to create user'
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
    const contentType = response.headers.get('content-type')
    let responseData = null

    if (contentType && contentType.includes('application/json')) {
      const text = await response.text()
      if (text) {
        try {
          responseData = JSON.parse(text)
        } catch {
          responseData = null
        }
      }
    }
    return { success: true, data: responseData }
  } catch (error) {
    console.error('Create user error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function updateUser(userId: string, data: UpdateUserData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/users/${userId}`,
      {
        method: 'PUT',
        headers: authResult.headers,
        body: JSON.stringify({
          username: data.username,
          gender: data.gender,
          dob: data.dob.toISOString(),
          email: data.email,
          ...(data.password && { password: data.password }),
          ...(data.confirmedPassword && {
            confirmedPassword: data.confirmedPassword,
          }),
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to update user',
      }
    }

    revalidatePath('/admin/users')
    return { success: true, data: await response.json() }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function deleteUser(id: number) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/${id}`, {
      method: 'DELETE',
      headers: authResult.headers,
    })

    if (!response.ok) {
      return { success: false, message: 'Failed to delete User' }
    }

    revalidatePath('/admin/users')
    return { success: true }
  } catch (error) {
    return { success: false, message: 'An error occurred', error }
  }
}
