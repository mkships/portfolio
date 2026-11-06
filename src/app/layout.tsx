import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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

const title = 'Musings of a Product Guy | Manohar Kanapaka'
const description = 'I’m Manohar Kanapaka. I’ve helped scale products to a million users. Now I’m building my own and sharing what I learn along the way.'
const socialImage = {
  url: '/images/social/musings.jpg',
  width: 1200,
  height: 630,
  alt: 'Musings of a Product Guy by Manohar Kanapaka, alongside a portrait of Manohar',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mkanapaka.space'),
  title,
  description,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    siteName: 'Manohar Kanapaka',
    type: 'website',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
