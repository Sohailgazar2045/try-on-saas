import type { Metadata } from 'next'
import './globals.css'
import { AppWrapper } from '@/components/AppWrapper'
import { ThemeProvider } from '@/components/ThemeProvider'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`
        }} />
      </head>
      <body>
        <ThemeProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
