'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function verifyAdminAccess(): Promise<string> {
  const token = await getValidAccessToken()
  if (!token) {
    redirect('/login')
  }
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    )
    if (!payload.scope?.includes('ADMIN')) {
      redirect('/profile')
    }
    return token
  } catch {
    redirect('/login')
  }
}

export async function refreshAccessToken(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value
    if (!refreshToken) {
      return false
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      cookieStore.delete('accessToken')
      cookieStore.delete('refreshToken')
      cookieStore.delete('isAdmin')
      return false
    }

    const data: {
      tokenType: string
      accessToken: string
      refreshToken: string
    } = await response.json()

    // Decode new access token
    const accessTokenPayload = JSON.parse(
      Buffer.from(data.accessToken.split('.')[1], 'base64').toString()
    )
    const accessTokenExp = accessTokenPayload.exp
    const currentTime = Math.floor(Date.now() / 1000)
    const accessTokenMaxAge = accessTokenExp - currentTime

    // Check if user is admin
    const scope = accessTokenPayload.scope || ''
    const isAdmin = scope.includes('ADMIN')

    // Decode new refresh token
    const refreshTokenPayload = JSON.parse(
      Buffer.from(data.refreshToken.split('.')[1], 'base64').toString()
    )
    const refreshTokenExp = refreshTokenPayload.exp
    const refreshTokenMaxAge = refreshTokenExp - currentTime

    // Update cookies with new tokens
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: accessTokenMaxAge,
      path: '/',
    })
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: refreshTokenMaxAge,
      path: '/',
    })
    cookieStore.set('isAdmin', isAdmin.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: accessTokenMaxAge,
      path: '/',
    })

    return true
  } catch (error) {
    console.error('Failed to refresh token:', error)
    return false
  }
}

export async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return null
  }
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )
    const currentTime = Math.floor(Date.now() / 1000)
    const isExpiringSoon = payload.exp - currentTime < 60

    if (isExpiringSoon) {
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        const freshCookieStore = await cookies()
        return freshCookieStore.get('accessToken')?.value || null
      }
      return null
    }

    return accessToken
  } catch {
    return null
  }
}

export async function getAuthHeaders() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return {
      success: false as const,
      headers: null,
      message: 'Not authenticated',
    }
  }
  return {
    success: true as const,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    } satisfies HeadersInit,
    message: null,
  }
}


// added more two method by thong : 
/**
 * Extract user email from the access token (from 'sub' claim)
 */
export async function getEmailFromToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
      return null
    }

    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )

    // In your token, email is in the 'sub' claim
    return payload.sub || null
  } catch (error) {
    console.error('Failed to extract email from token:', error)
    return null
  }
}

/**
 * Extract user ID from the access token
 */
export async function getUserIdFromToken(): Promise<number | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
      return null
    }

    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )

    // Assuming your JWT has 'id' or 'userId' or 'sub' field
    // Adjust based on your actual token structure
    const userId = payload.id || payload.userId || payload.sub

    return userId ? parseInt(userId, 10) : null
  } catch (error) {
    console.error('Failed to extract user ID from token:', error)
    return null
  }
}

