import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormState } from '@/lib/definitions'
import { SubmitButton } from '@/lib/utils/functions'
import Link from 'next/link'


interface SignupFormComponentProp {
  formAction: (payload: FormData) => void
  state: FormState
}

export default function SignupFormComponent({
  formAction,
  state,
}: SignupFormComponentProp) {
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
          <div className='text-center pb-5'>
            <FieldLegend>
              <h1 className='font-bold text-3xl lg:text-4xl text-foreground'>
                Create Account
              </h1>
            </FieldLegend>
            <FieldDescription className='text-lg text-muted-foreground mt-2'>
              Fill in your details to get started.
            </FieldDescription>
          </div>

          <FieldGroup>
            {/* Two-column layout for tablet and up */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Username */}
              <Field>
                <FieldLabel htmlFor='username' className='text-md font-bold'>
                  Username
                </FieldLabel>
                <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='jungkook_shi'
                  className='h-12'
                  defaultValue={state?.values?.username}
                  aria-invalid={!!state?.errors?.username}
                />
                {state?.errors?.username && (
                  <FieldError>{state.errors.username[0]}</FieldError>
                )}
              </Field>

              {/* Name */}
              <Field>
                <FieldLabel htmlFor='name' className='text-md font-bold'>
                  Full Name
                </FieldLabel>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  className='h-12'
                  placeholder='Jeon Jungkook'
                  defaultValue={state?.values?.name}
                  aria-invalid={!!state?.errors?.name}
                />
                {state?.errors?.name && (
                  <FieldError>{state.errors.name[0]}</FieldError>
                )}
              </Field>

              {/* Gender */}
              <Field>
                <FieldLabel htmlFor='gender' className='text-md font-bold'>
                  Gender
                </FieldLabel>
                <Select
                  name='gender'
                  defaultValue={state?.values?.gender || ''}
                >
                  <SelectTrigger id='gender' className='py-5.5'>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MALE' className='py-3 cursor-pointer'>
                      Male
                    </SelectItem>
                    <SelectItem value='FEMALE' className='py-3 cursor-pointer'>
                      Female
                    </SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.gender && (
                  <FieldError>{state.errors.gender[0]}</FieldError>
                )}
              </Field>

              {/* Date of Birth */}
              <Field>
                <FieldLabel htmlFor='dateOfBirth' className='text-md font-bold'>
                  Date of Birth
                </FieldLabel>
                <Input
                  id='dateOfBirth'
                  name='dateOfBirth'
                  className='h-12'
                  type='date'
                  defaultValue={state?.values?.dateOfBirth}
                  aria-invalid={!!state?.errors?.dateOfBirth}
                />
                {state?.errors?.dateOfBirth && (
                  <FieldError>{state.errors.dateOfBirth[0]}</FieldError>
                )}
              </Field>

              {/* Email - Full width */}
              <Field className='md:col-span-2'>
                <FieldLabel htmlFor='email' className='text-md font-bold'>
                  Email
                </FieldLabel>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  className='h-12'
                  placeholder='john@example.com'
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
                  className='h-12'
                  type='password'
                  placeholder='••••••••'
                  aria-invalid={!!state?.errors?.password}
                />
                {state?.errors?.password && (
                  <div className='space-y-1'>
                    {state.errors.password.map((error, i) => (
                      <FieldError key={i}>• {error}</FieldError>
                    ))}
                  </div>
                )}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel
                  htmlFor='confirmPassword'
                  className='text-md font-bold'
                >
                  Confirm Password
                </FieldLabel>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  placeholder='••••••••'
                  className='h-12'
                  aria-invalid={!!state?.errors?.confirmPassword}
                />
                {state?.errors?.confirmPassword && (
                  <FieldError>{state.errors.confirmPassword[0]}</FieldError>
                )}
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>

        <div className='mt-8'>
          <SubmitButton loadingText='Signing Up...' text='Sign Up'/>
        </div>

        <p className='text-center text-lg text-muted-foreground mt-6'>
          Already have an account?&nbsp;
          <Link
            href='/login'
            className='font-medium text-primary hover:underline'
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}
