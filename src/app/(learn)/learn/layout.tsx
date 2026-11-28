import type { Metadata } from 'next'
import { Fraunces, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import './learn.css'

// These fonts are only used inside the learning space.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-space-grotesk',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

// The growth track's headings. Not preloaded, so the other pages do not fetch it.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Learning in public | Manohar Kanapaka',
    template: '%s | Learning in public, Manohar Kanapaka',
  },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${plexMono.variable} ${fraunces.variable}`} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
