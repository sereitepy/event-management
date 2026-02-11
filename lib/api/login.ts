'use server'

import { cookies } from 'next/headers'
import { API_BASE_URL, FormState } from '../definitions'
import { redirect } from 'next/navigation'

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      message: 'Email and password are required',
      values: { email },
    }
  }

  let isAdmin = false

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Invalid credentials')
    }

    const data: {
      tokenType: string
      accessToken: string
      refreshToken: string
    } = await response.json()

    // Decode JWT to get expiration and role
    const accessTokenPayload = JSON.parse(
      Buffer.from(data.accessToken.split('.')[1], 'base64').toString()
    )
    const accessTokenExp = accessTokenPayload.exp
    const currentTime = Math.floor(Date.now() / 1000)
    const accessTokenMaxAge = accessTokenExp - currentTime

    // Check if user is admin based on scope
    const scope = accessTokenPayload.scope || ''
    isAdmin = scope.includes('ADMIN')

    const refreshTokenPayload = JSON.parse(
      Buffer.from(data.refreshToken.split('.')[1], 'base64').toString()
    )
    const refreshTokenExp = refreshTokenPayload.exp
    const refreshTokenMaxAge = refreshTokenExp - currentTime

    // Store tokens in cookies
    const cookieStore = await cookies()
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
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Failed to login',
      values: { email },
    }
  }

  redirect(isAdmin ? '/admin/dashboard' : '/')
}
