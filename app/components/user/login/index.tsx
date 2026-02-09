'use client'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { login } from '@/lib/api/login'
import { SubmitButton } from '@/lib/utils/functions'
import Link from 'next/link'
import { useActionState } from 'react'

export default function LoginFormComponent() {
  const [state, formAction] = useActionState(login, undefined)

  return (
    <div className='flex items-center justify-center p-4 md:py-10 lg:py-20 bg-secondary'>
      <form
        action={formAction}
        className='w-full max-w-4xl bg-card rounded-2xl shadow-xl p-8 lg:p-12 border border-border'
      >
        {state?.message && (
          <div className='rounded-lg p-4 mb-6 text-sm text-destructive bg-destructive/10 border border-destructive/20'>
            {state.message}
          </div>
        )}

        <FieldSet>
          <div className='text-center'>
            <FieldLegend>
              <h1 className='font-bold text-3xl lg:text-4xl text-foreground'>
                Welcome Back
              </h1>
            </FieldLegend>
            <FieldDescription className='text-lg text-muted-foreground mt-2'>
              Log in to your account
            </FieldDescription>
          </div>

          <FieldGroup>
            <div className='grid grid-cols-1 gap-6'>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor='email' className='text-md font-bold'>
                  Email
                </FieldLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  className='h-12'
                  placeholder='jk@example.com'
                  defaultValue={state?.values?.email}
                  aria-invalid={!!state?.errors?.email}
                />
                {state?.errors?.email && (
                  <FieldError>{state.errors.email[0]}</FieldError>
                )}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor='password' className='text-md font-bold'>
                  Password
                </FieldLabel>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  className='h-12'
                  placeholder='••••••••'
                  aria-invalid={!!state?.errors?.password}
                />
                {state?.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>

        <div className='mt-8'>
          <SubmitButton loadingText='Logging in...' text='Login' />
        </div>

        <p className='text-center text-lg text-muted-foreground mt-6'>
          Don&apos;t have an account?&nbsp;
          <Link
            href='/signup'
            className='font-medium text-primary hover:underline'
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}