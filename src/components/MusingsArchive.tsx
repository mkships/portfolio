'use client'

import { useState } from 'react'
import type { Musing } from '@/lib/musings'
import MusingsList from './MusingsList'

const filters = [
  { label: 'All', matches: () => true },
  { label: 'Essays', matches: (entry: Musing) => entry.kind === 'essay' },
  { label: 'Unfiltered thoughts', matches: (entry: Musing) => entry.kind === 'note' },
  { label: 'Building with AI', matches: (entry: Musing) => entry.topic === 'building-with-ai' },
]

export default function MusingsArchive({ entries }: { entries: Musing[] }) {
  const [filter, setFilter] = useState(filters[0])
  const visibleEntries = entries.filter(filter.matches)

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Filter musings" className="flex flex-wrap gap-2">
        {filters.map(option => (
          <button
            key={option.label}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className="min-h-11 rounded-full border border-[var(--panel-border)] bg-[var(--card)] px-4 text-sm font-medium hover:border-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:border-moss-dark aria-pressed:bg-moss-dark aria-pressed:text-white dark:hover:border-moss-light dark:aria-pressed:border-moss-light dark:aria-pressed:bg-moss-light dark:aria-pressed:text-zinc-950"
          >
            {option.label}
          </button>
        ))}
      </div>

      <p role="status" className="sr-only">{visibleEntries.length} {visibleEntries.length === 1 ? 'entry' : 'entries'} shown</p>
      {visibleEntries.length > 0 ? <MusingsList entries={visibleEntries} archive /> : (
        <p className="text-zinc-600 dark:text-zinc-400">No entries in this filter yet.</p>
      )}
    </div>
  )
}
