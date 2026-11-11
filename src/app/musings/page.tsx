import type { Metadata } from 'next'
import MusingsArchive from '@/components/MusingsArchive'
import { getMusings } from '@/lib/musings'

const description = 'Notes on products, building with AI, and life on and off court.'

export const metadata: Metadata = {
  title: 'Musings | Manohar Kanapaka',
  description,
}

export default function MusingsPage() {
  const entries = getMusings()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 pt-6 sm:gap-8 sm:px-6 sm:pt-10 md:pt-14">
      <header className="portfolio-panel space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Musings</h1>
        <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{description}</p>
      </header>

      {entries.length > 0 ? <MusingsArchive entries={entries} /> : (
        <p className="text-zinc-600 dark:text-zinc-400">The first musings are on the way.</p>
      )}
    </div>
  )
}
