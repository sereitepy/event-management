import { getAuthHeaders } from '../auth'
import { API_BASE_URL } from '../definitions'

export interface UserProfile {
  id: number
  username: string
  email: string
  gender: string
  dob: string
  isDeleted: boolean
  profileImage: string
}

export interface UpdateProfileRequest {
  username: string
  email: string
  profileImage: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T | null
}

/**
 * Fetch current user profile
 * First gets the user ID by email, then fetches the full profile
 */
export async function getCurrentUserProfile(): Promise<ApiResponse<UserProfile>> {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    // First, try to get current user info (adjust endpoint based on your API)
    // Common endpoints: /api/v1/users/me or /api/v1/auth/me
    const response = await fetch(
      `${API_BASE_URL}/api/v1/users/me`,
      {
        headers: authResult.headers,
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch current user:', response.status)
      return {
        success: false,
        message: 'Failed to fetch user profile',
        data: null,
      }
    }

    const data = await response.json()
    return { success: true, data: data as UserProfile }
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    return { success: false, message: 'An error occurred', data: null }
  }
}

/**
 * Fetch user profile by ID
 */
export async function getUserProfileById(
  id: number
): Promise<ApiResponse<UserProfile>> {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/users/profile/${id}`,
      {
        headers: authResult.headers,
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch user profile:', response.status)
      return {
        success: false,
        message: 'Failed to fetch user profile',
        data: null,
      }
    }

    const data = await response.json()
    return { success: true, data: data as UserProfile }
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    return { success: false, message: 'An error occurred', data: null }
  }
}

/**
 * Update user profile by ID
 */
export async function updateUserProfileById(
  id: number,
  profileData: UpdateProfileRequest
): Promise<ApiResponse<UserProfile>> {
  const authResult = await getAuthHeaders()
  if (!authResult.success) {
    return { success: false, message: authResult.message, data: null }
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/users/update/${id}`,
      {
        method: 'PATCH',
        headers: {
          ...authResult.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Failed to update user profile:', response.status)
      return {
        success: false,
        message: 'Failed to update user profile',
        data: null,
      }
    }

    const data = await response.json()
    return { success: true, data: data as UserProfile }
  } catch (error) {
    console.error('Failed to update user profile:', error)
    return { success: false, message: 'An error occurred', data: null }
  }
}