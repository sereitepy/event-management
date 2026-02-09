import { cookies } from 'next/headers'
import HeaderClient from './header-client'

interface HeaderProps {
  locale: string | 'en' | 'km'
}

async function getUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (!accessToken) {
    return null
  }
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64').toString()
    )
    const scope = payload.scope || ''
    const isAdmin = scope.includes('ADMIN')
    return {
      email: payload.sub,
      isAdmin,
    }
  } catch {
    return null
  }
}

export default async function Header({ locale }: HeaderProps) {
  const user = await getUser()
  return <HeaderClient user={user} locale={locale} />
}
