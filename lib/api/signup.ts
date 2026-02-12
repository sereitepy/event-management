'use server'

import { redirect } from 'next/navigation'
import { API_BASE_URL, FormState, SignupFormSchema } from '../definitions'

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
    console.log(
      'Validation errors:',
      validatedFields.error.flatten().fieldErrors
    )
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

  const payload = {
    username: validatedFields.data.username,
    gender: validatedFields.data.gender,
    dob: validatedFields.data.dateOfBirth,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    confirmedPassword: validatedFields.data.confirmPassword,
  }

  console.log('Request payload:', {
    ...payload,
    password: '[REDACTED]',
    confirmedPassword: '[REDACTED]',
  })

  try {
    if (!API_BASE_URL) {
      console.error('API_BASE_URL is not defined!')
      return {
        message: 'Configuration error: API_BASE_URL is not set',
        values: {
          username,
          name,
          email,
          dateOfBirth,
          gender,
        },
      }
    }

    const url = `${API_BASE_URL}/api/v1/auth/register`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('API error response:', errorData)

      return {
        message:
          errorData.message ||
          `Registration failed (Status: ${response.status})`,
        values: {
          username,
          name,
          email,
          dateOfBirth,
          gender,
        },
      }
    }

  } catch (error) {
    console.error('Fetch error:', error)

    let errorMessage = 'Failed to create account'

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      errorMessage = `Cannot connect to API server. Please check: 1) API server is running at ${API_BASE_URL}, 2) CORS is configured, 3) No network blocking`
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      message: errorMessage,
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
