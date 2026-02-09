import * as z from 'zod'

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'
  
export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long.' })
      .max(20, { message: 'Username must be at most 20 characters long.' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores.',
      })
      .trim(),
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .max(50, { message: 'Name must be at most 50 characters long.' })
      .trim(),
    email: z
      .string()
      .email({ message: 'Please enter a valid email.' })
      .trim()
      .toLowerCase(),
    gender: z.enum(['MALE', 'FEMALE'], {
      message: 'Please select a gender.',
    }),
    dateOfBirth: z
      .string()
      .min(1, { message: 'Date of birth is required.' })
      .refine(
        date => {
          const birthDate = new Date(date)
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          const dayDiff = today.getDate() - birthDate.getDate()
          const actualAge =
            monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age
          return actualAge >= 13
        },
        { message: 'You must be at least 13 years old.' }
      )
      .refine(
        date => {
          const birthDate = new Date(date)
          const today = new Date()
          return birthDate <= today
        },
        { message: 'Date of birth cannot be in the future.' }
      ),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export type FormState =
  | {
      errors?: {
        username?: string[]
        name?: string[]
        gender?: string[]
        email?: string[]
        dateOfBirth?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      values?: {
        username?: string
        name?: string
        email?: string
        gender?: string
        dateOfBirth?: string
      }
      message?: string
    }
  | undefined
