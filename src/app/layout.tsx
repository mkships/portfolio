import type { Metadata } from 'next'
import { Inter, Geist, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mkanapaka.space'),
  title: 'MK | Manohar Kanapaka - Product, AI and Vibe-Coding',
  description: 'Product guy who thinks fluently in systems, design, and execution. Building and experimenting with agentic coding tools.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'MK | Manohar Kanapaka - Product, AI and Vibe-Coding',
    description: 'Product guy who thinks fluently in systems, design, and execution. Building and experimenting with agentic coding tools.',
    url: 'https://mkanapaka.space',
    siteName: 'Manohar Kanapaka',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    creator: '@mkanapaka',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#F5F1E8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
