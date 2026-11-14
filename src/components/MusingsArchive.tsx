'use client'

import { useState } from 'react'
import type { Musing } from '@/lib/musings'
import { musingTopics } from '@/lib/musing-topics'
import MusingsList from './MusingsList'

const pageSize = 20
const buttonClass = 'min-h-11 rounded-full border border-[var(--panel-border)] bg-[var(--card)] px-4 text-sm font-medium hover:border-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:border-moss-dark aria-pressed:bg-moss-dark aria-pressed:text-white dark:hover:border-moss-light dark:aria-pressed:border-moss-light dark:aria-pressed:bg-moss-light dark:aria-pressed:text-zinc-950'

export default function MusingsArchive({ entries }: { entries: Musing[] }) {
  const filters = [
    { label: 'All', matches: (_entry: Musing) => true },
    ...Object.entries(musingTopics)
      .map(([topic, label]) => ({ label, matches: (entry: Musing) => entry.topics.includes(topic) })),
  ]
  const [selected, setSelected] = useState(filters[0].label)
  const [shown, setShown] = useState(pageSize)
  const filter = filters.find(option => option.label === selected) ?? filters[0]
  const matching = entries.filter(filter.matches)
  const visibleEntries = matching.slice(0, shown)

  return (
    <div className="space-y-5">
      <div role="group" aria-label="Filter musings" className="flex flex-wrap gap-2">
        {filters.map(option => (
          <button
            key={option.label}
            type="button"
            aria-pressed={filter === option}
            onClick={() => {
              setSelected(option.label)
              setShown(pageSize)
            }}
            className={buttonClass}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p role="status" className="sr-only">
        {visibleEntries.length} of {matching.length} {matching.length === 1 ? 'entry' : 'entries'} shown
      </p>
      {visibleEntries.length > 0 ? <MusingsList entries={visibleEntries} archive /> : (
        <p className="text-zinc-600 dark:text-zinc-400">No entries in this filter yet.</p>
      )}
      {matching.length > shown && (
        <button type="button" onClick={() => setShown(shown + pageSize)} className={buttonClass}>
          Show more ({matching.length - shown} left)
        </button>
      )}
    </div>
  )
}
