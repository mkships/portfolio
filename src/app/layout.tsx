import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mkanapaka.space'),
  title: 'Musings of a Product Guy',
  description: 'My space on the internet, showcasing my work, hobbies, and experiments.',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#FBF6EE] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
