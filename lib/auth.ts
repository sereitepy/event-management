'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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
      // Clear cookies
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
    // Check if token is expired or about to expire (within 1 minute)
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )
    const currentTime = Math.floor(Date.now() / 1000)
    const isExpiringSoon = payload.exp - currentTime < 60

    if (isExpiringSoon) {
      // Try to refresh
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        // Get the new token
        return cookieStore.get('accessToken')?.value || null
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
    return { success: false, headers: null, message: 'Not authenticated' }
  }

  return {
    success: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    message: null,
  }
}
