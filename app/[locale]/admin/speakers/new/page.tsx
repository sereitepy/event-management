import SpeakerForm from '@/app/components/admin/speakers/speaker-form'
import { verifyAdminAccess } from '@/lib/auth'

export default async function NewSpeakerPage() {
  await verifyAdminAccess()
  return <SpeakerForm mode='create' />
}
