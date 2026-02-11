'use client'

import { useActionState } from 'react'
import SignupFormComponent from './signup-form'
import { signup } from '@/lib/api/signup'

export default function SignUpComponent() {
  const [state, formAction] = useActionState(signup, undefined)

  return (
    <div>
      <SignupFormComponent formAction={formAction} state={state} />
    </div>
  )
}
