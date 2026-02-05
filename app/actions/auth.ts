'use server'
import { FormState, SignupFormSchema } from '@/lib/definitions'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // Extract values
  const username = formData.get('username') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const dateOfBirth = formData.get('dateOfBirth') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const gender = formData.get('gender') as string

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username,
    name,
    email,
    dateOfBirth,
    password,
    confirmPassword,
    gender,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(issue => issue.message).fieldErrors,
      values: {
        username,
        name,
        email,
        dateOfBirth,
        gender,
      },
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: validatedFields.data.username,
        gender: validatedFields.data.gender,
        dob: validatedFields.data.dateOfBirth,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        confirmedPassword: validatedFields.data.confirmPassword,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Failed to create account')
    }

  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'Failed to create account',
      values: {
        username,
        name,
        email,
        dateOfBirth,
        gender,
      },
    }
  }

  redirect('/login')
}

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

    // Decode JWT to get expiration (basic decode, no verification needed here)
    const accessTokenPayload = JSON.parse(
      Buffer.from(data.accessToken.split('.')[1], 'base64').toString()
    )
    const accessTokenExp = accessTokenPayload.exp
    const currentTime = Math.floor(Date.now() / 1000)
    const accessTokenMaxAge = accessTokenExp - currentTime

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

    // SUCCESS - exit try-catch
  } catch (error) {
    console.error('❌ Login error:', error)
    return {
      message: error instanceof Error ? error.message : 'Failed to login',
      values: { email },
    }
  }

  // Redirect OUTSIDE try-catch
  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  redirect('/login')
}
