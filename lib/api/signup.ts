import { redirect } from "next/navigation"
import { API_BASE_URL, FormState, SignupFormSchema } from "../definitions"

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