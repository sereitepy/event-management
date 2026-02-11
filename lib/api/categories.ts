'use server'

import { cookies } from 'next/headers'
import { API_BASE_URL } from '../definitions'
import { revalidatePath } from 'next/cache'
import { getAuthHeaders } from '../auth'
import { CategoryFormData } from '@/types/category'

export async function getCategories() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return []
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

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

export async function getCategoryById(id: number) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return null
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    )
    if (!response.ok) {
      console.error('Failed to fetch category:', response.status)
      return null
    }
    const data = await response.json()
    return data as {
      id: number
      name: string
      description: string
      createdAt: string
    }
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return null
  }
}

export async function createCategory(data: CategoryFormData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/categories`, {
      method: 'POST',
      headers: authResult.headers,
      body: JSON.stringify({
        ...data,
        price: data.name?.toString(),
        description: data.description?.toString(),
      }),
    })
    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to create category',
      }
    }
    revalidatePath('/admin/categories')
    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function updateCategory(id: number, data: CategoryFormData) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/categories/${id}`,
      {
        method: 'POST',
        headers: authResult.headers,
        body: JSON.stringify({
          ...data,
          name: data.name?.toString(),
          description: data.description?.toString(),
        }),
      }
    )
    if (!response.ok) {
      const error = await response.json()
      return {
        success: false,
        message: error.message || 'Failed to update category',
      }
    }
    revalidatePath('/admin/categories')
    return { success: true, data: await response.json() }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function deleteCategory(id: number) {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/categories/${id}`,
      {
        method: 'DELETE',
        headers: authResult.headers,
      }
    )

    if (!response.ok) {
      return { success: false, message: 'Failed to delete category' }
    }

    revalidatePath('/admin/categories')
    return { success: true }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}
