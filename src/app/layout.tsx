import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const inter = localFont({
  src: './fonts/inter.woff2',
  weight: '100 900',
  variable: '--font-inter',
})

const plusJakartaSans = localFont({
  src: './fonts/plus-jakarta-sans.woff2',
  weight: '200 800',
  variable: '--font-plus-jakarta-sans',
})

const title = 'Manohar Kanapaka | Product guy, now building with AI'
const description = 'I’m Manohar Kanapaka. I’ve helped scale products to a million users. Now I’m building my own and sharing what I learn along the way.'
const socialImage = {
  url: '/images/social/home.jpg',
  width: 1200,
  height: 630,
  alt: 'Manohar Kanapaka: I helped scale products to 1M+ users. Now I’m building my own. Alongside a portrait of Manohar.',
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

// A bare shell. The main site's header and footer live in (site)/layout.tsx, and the
// learning space under (learn)/ brings its own, so the two can look different.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased bg-[#FBF6EE] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
