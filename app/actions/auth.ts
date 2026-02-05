'use server'

import { FormState, SignupFormSchema } from '@/lib/definitions'
import { mockAuthAPI } from '@/lib/mock-api/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

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

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username,
    name,
    email,
    dateOfBirth,
    password,
    confirmPassword,
  })

  // If validation fails, return errors AND values
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(issue => issue.message).fieldErrors,
      values: {
        username,
        name,
        email,
        dateOfBirth,
      },
    }
  }

  // Call mock API
  try {
    await mockAuthAPI.signup({
      username: validatedFields.data.username,
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      dateOfBirth: validatedFields.data.dateOfBirth,
      password: validatedFields.data.password,
    })
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'Failed to create account',
      values: {
        username,
        name,
        email,
        dateOfBirth,
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

  console.log('🔐 Login action called with:', { email, password: '***' })

  if (!email || !password) {
    return {
      message: 'Email and password are required',
      values: { email },
    }
  }

  try {
    const response = await mockAuthAPI.login({ email, password })

    console.log('✅ Login successful, setting cookies...')

    // Store tokens in cookies
    const cookieStore = await cookies()

    cookieStore.set('accessToken', response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: response.expiresIn / 1000,
      path: '/',
    })

    cookieStore.set('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    console.log('🍪 Cookies set, redirecting...')
  } catch (error) {
    console.error('❌ Login error:', error)
    return {
      message: error instanceof Error ? error.message : 'Failed to login',
      values: { email },
    }
  }

  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    try {
      await mockAuthAPI.logout(accessToken)
    } catch (error) {
      // Ignore errors during logout
    }
  }

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  redirect('/login')
}
