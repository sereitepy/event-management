'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createUser, updateUser } from '@/lib/api/user'
import { UserFormSchema, UserFormValues } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ArrowLeft, CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface UserFormProps {
  mode: 'create' | 'update'
  defaultValues?: Partial<UserFormValues>
  userId?: string
}

export default function UserForm({
  mode,
  defaultValues,
  userId,
}: UserFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: defaultValues || {
      username: '',
      gender: undefined,
      dob: undefined,
      email: '',
      password: '',
      confirmedPassword: '',
    },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    defaultValues?.dob || new Date(2000, 0, 1)
  )

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true)
    setError(null)
    try {
      const result =
        mode === 'create'
          ? await createUser(data)
          : await updateUser(userId!, data)

      if (!result.success) {
        setError(result.message || 'An error occurred')
        return
      }

      router.push('/admin/users')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  )
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 py-8'>
      <div className='mb-6'>
        <Link href='/admin/users'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Users
          </Button>
        </Link>
      </div>

      <div className='border bg-input/30 rounded-lg shadow p-4 sm:p-6 lg:p-8 dark:border-input'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>
          {mode === 'create' ? 'Create New User' : 'Edit User'}
        </h1>

        {error && (
          <div className='border border-destructive px-4 py-3 rounded mb-6'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Personal Information Section */}
          <div>
            <h2 className='text-lg font-semibold mb-4 text-muted-foreground'>
              Personal Information
            </h2>

            {/* Username, Gender, DOB - 3 columns on large screens */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <FieldGroup>
                  <Input placeholder='jk_username' {...register('username')} />
                </FieldGroup>
                <FieldDescription>Your public display name</FieldDescription>
                {errors.username && (
                  <FieldError>{errors.username.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Gender</FieldLabel>
                <FieldGroup>
                  <Select
                    defaultValue={defaultValues?.gender}
                    onValueChange={value =>
                      setValue('gender', value as 'MALE' | 'FEMALE' | 'OTHER', {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='MALE'>Male</SelectItem>
                      <SelectItem value='FEMALE'>Female</SelectItem>
                      <SelectItem value='OTHER'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
                {errors.gender && (
                  <FieldError>{errors.gender.message}</FieldError>
                )}
              </Field>

              <Field className='w-full'>
                <FieldLabel>Date of Birth</FieldLabel>
                <FieldGroup>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !getValues('dob') && 'text-muted-foreground'
                        )}
                      >
                        {getValues('dob') ? (
                          format(getValues('dob'), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <div className='p-3 border-b space-y-2'>
                        <div className='flex gap-2'>
                          <Select
                            value={calendarMonth.getMonth().toString()}
                            onValueChange={value => {
                              const newDate = new Date(calendarMonth)
                              newDate.setMonth(parseInt(value))
                              setCalendarMonth(newDate)
                            }}
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month, index) => (
                                <SelectItem
                                  key={month}
                                  value={index.toString()}
                                >
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={calendarMonth.getFullYear().toString()}
                            onValueChange={value => {
                              const newDate = new Date(calendarMonth)
                              newDate.setFullYear(parseInt(value))
                              setCalendarMonth(newDate)
                            }}
                          >
                            <SelectTrigger className='w-25'>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Calendar
                        mode='single'
                        selected={getValues('dob')}
                        onSelect={date =>
                          setValue('dob', date as Date, {
                            shouldValidate: true,
                          })
                        }
                        month={calendarMonth}
                        onMonthChange={setCalendarMonth}
                        disabled={date =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FieldGroup>
                {errors.dob && <FieldError>{errors.dob.message}</FieldError>}
              </Field>
            </div>
          </div>

          {/* Account Information Section */}
          <div>
            <h2 className='text-lg font-semibold mb-4 text-foreground'>
              Account Information
            </h2>

            {/* Email - Full width */}
            <div className='mb-4'>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldGroup>
                  <Input
                    type='email'
                    placeholder='jk@example.com'
                    {...register('email')}
                  />
                </FieldGroup>
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
            </div>

            {/* Password and Confirm Password - 2 columns */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <FieldGroup>
                  <Input
                    type='password'
                    placeholder='••••••••'
                    {...register('password')}
                  />
                </FieldGroup>
                <FieldDescription className='text-xs'>
                  Min 8 chars, uppercase, lowercase, number & special char
                </FieldDescription>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <FieldGroup>
                  <Input
                    type='password'
                    placeholder='••••••••'
                    {...register('confirmedPassword')}
                  />
                </FieldGroup>
                <FieldDescription className='text-xs'>
                  Re-enter your password
                </FieldDescription>
                {errors.confirmedPassword && (
                  <FieldError>{errors.confirmedPassword.message}</FieldError>
                )}
              </Field>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end gap-3 pt-4 border-t'>
            <Link href='/admin/users'>
              <Button type='button' variant='outline' disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button type='submit' disabled={loading} className='min-w-32'>
              {loading
                ? 'Loading...'
                : mode === 'create'
                  ? 'Create Account'
                  : 'Update Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
