'use client'

import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50'
    >
      {pending ? 'Signing up...' : 'Sign Up'}
    </button>
  )
}

export default function SignupForm() {
  const [state, formAction] = useActionState(signup, undefined)

  return (
    <form action={formAction} className='mx-auto max-w-md space-y-6 p-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Create Account</h1>
        <p className='text-sm text-gray-600'>Sign up to get started</p>
      </div>

      {state?.message && (
        <div className='rounded-lg bg-red-50 p-4 text-sm text-red-800'>
          {state.message}
        </div>
      )}

      <div className='space-y-4'>
        {/* Username */}
        <div className='space-y-1'>
          <label htmlFor='username' className='block text-sm font-medium'>
            Username
          </label>
          <input
            id='username'
            name='username'
            type='text'
            placeholder='johndoe'
            defaultValue={state?.values?.username}
            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          />
          {state?.errors?.username && (
            <p className='text-sm text-red-600'>{state.errors.username[0]}</p>
          )}
        </div>

        {/* Name */}
        <div className='space-y-1'>
          <label htmlFor='name' className='block text-sm font-medium'>
            Full Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='John Doe'
            defaultValue={state?.values?.name}
            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          />
          {state?.errors?.name && (
            <p className='text-sm text-red-600'>{state.errors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className='space-y-1'>
          <label htmlFor='email' className='block text-sm font-medium'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='john@example.com'
            defaultValue={state?.values?.email}
            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          />
          {state?.errors?.email && (
            <p className='text-sm text-red-600'>{state.errors.email[0]}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className='space-y-1'>
          <label htmlFor='dateOfBirth' className='block text-sm font-medium'>
            Date of Birth
          </label>
          <input
            id='dateOfBirth'
            name='dateOfBirth'
            type='date'
            defaultValue={state?.values?.dateOfBirth}
            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          />
          {state?.errors?.dateOfBirth && (
            <p className='text-sm text-red-600'>
              {state.errors.dateOfBirth[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className='space-y-1'>
          <label htmlFor='password' className='block text-sm font-medium'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='••••••••'
            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          />
          {state?.errors?.password && (
            <div className='space-y-1'>
              {state.errors.password.map((error, i) => (
                <p key={i} className='text-sm text-red-600'>
                  • {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className='space-y-1'>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium'
          >
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            placeholder='••••••••'
            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
          />
          {state?.errors?.confirmPassword && (
            <p className='text-sm text-red-600'>
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>
      </div>

      <SubmitButton />

      <p className='text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link href='/login' className='font-medium text-blue-600 hover:underline'>
          Log in
        </Link>
      </p>
    </form>
  )
}
