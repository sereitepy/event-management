import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

interface SubmitButtonProp {
  loadingText: string
  text: string
}

export function SubmitButton({ loadingText, text }: SubmitButtonProp) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full rounded-lg bg-blue-600 px-4 py-5.5 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-lg'
    >
      {pending ? `${loadingText}` : `${text}`}
    </Button>
  )
}