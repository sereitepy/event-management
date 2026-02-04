import { mockEventDetails } from '@/mock-data/event-detail'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const event = mockEventDetails.find(e => e.id === id)

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  return NextResponse.json(event)
}
