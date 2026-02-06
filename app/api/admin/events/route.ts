import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getValidAccessToken } from '@/lib/auth'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:2223'

export async function POST(request: NextRequest) {
  try {
    // Get valid access token (will auto-refresh if needed)
    const accessToken = await getValidAccessToken()

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify admin role
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )

    if (!payload.scope?.includes('ADMIN')) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { success: false, message: error.message || 'Failed to create event' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
