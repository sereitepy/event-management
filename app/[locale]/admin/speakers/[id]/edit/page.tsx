import SpeakerForm from '@/app/components/admin/speakers/speaker-form'
import { getSpeakerById } from '@/lib/api/speakers'
import { redirect } from 'next/navigation'

export default async function AdminEditSpeakers({
  params,
}: {
  params: { id: number }
}) {
  const { id } = await params
  const speakers = await getSpeakerById(id)
  if (!speakers.data) {
    redirect('/admin/speakers')
  }
  return (
    <div>
      <SpeakerForm mode='edit' speakerId={id} initialData={speakers.data} />
    </div>
  )
}
