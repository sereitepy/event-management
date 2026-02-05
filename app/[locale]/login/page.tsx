'use client'

import { login } from '@/app/actions/auth'
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
      {pending ? 'Logging in...' : 'Log In'}
    </button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, undefined)

  return (
    <form action={formAction} className='mx-auto max-w-md space-y-6 p-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Welcome Back</h1>
        <p className='text-sm text-gray-600'>Log in to your account</p>
      </div>

      {state?.message && (
        <div className='rounded-lg bg-red-50 p-4 text-sm text-red-800'>
          {state.message}
        </div>
      )}

      <div className='space-y-4'>
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
        </div>

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
        </div>
      </div>

      <SubmitButton />

      <p className='text-center text-sm text-gray-600'>
        Don&apos;t have an account?
        <Link
          href='/signup'
          className='font-medium text-blue-600 hover:underline'
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}
