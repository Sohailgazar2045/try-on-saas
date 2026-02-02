import type { Metadata } from 'next'
import './globals.css'
import { AppWrapper } from '@/components/AppWrapper'

export const metadata: Metadata = {
  title: 'Virtual Try-On | AI-Powered Fashion Technology',
  description: 'Transform your fashion workflow with AI-powered virtual try-on. Upload a photo, try on clothes, and see instant results.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  )
}
