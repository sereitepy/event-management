import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono, Manrope } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeProvider } from './components/header/theme-provider'
import './globals.css'
import Header from './components/header'
import Footer from './components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'evenTs | Phnom Penh',
  description: 'Find your next phnom penh based events here!',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <div className='min-h-screen flex flex-col justify-between'>
              <div className='sticky -top-1 z-12 bg-background pt-0.5 shadow-md border-b'>
                <Header locale={locale} />
              </div>
              <div className='grow'>{children}</div>
              <div className='border-t'>

              <Footer />
              </div>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
