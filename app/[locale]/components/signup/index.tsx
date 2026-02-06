'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import SignupFormComponent from './signup-form'

export default function SignUpComponent() {
  const [state, formAction] = useActionState(signup, undefined)

  return (
    <div>
      <SignupFormComponent formAction={formAction} state={state} />
    </div>
  )
}
