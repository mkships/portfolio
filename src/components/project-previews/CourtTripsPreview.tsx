'use client'

import { useState } from 'react'
import { ExternalLink, MapPin } from 'lucide-react'
import PreviewPicker from './PreviewPicker'

const trips = [
  {
    sport: 'Tennis',
    title: 'Tennis and padel weekend',
    location: 'Brighton, United Kingdom',
    organizer: 'Active Away',
    details: 'A coastal weekend with coaching and match play in both sports at Hove Beach Park.',
    url: 'https://activeaway.com/tennis-clinic/brighton-tennis-padel-weekend',
    court: 'tennis',
  },
  {
    sport: 'Pickleball',
    title: 'Nike Adult Pickleball Camp',
    location: 'Palm Desert, United States',
    organizer: 'US Sports Camps',
    details: 'An adult day camp at TTC Palms with instruction and match play, grouped by skill level.',
    url: 'https://www.ussportscamps.com/pickleball/nike/adult-sunrise-country-club',
    court: 'pickleball',
  },
  {
    sport: 'Padel',
    title: 'M3 Padel Week',
    location: 'Madrid, Spain',
    organizer: 'M3 Padel Academy',
    details: 'Five days of training with classes adapted to different skill levels and optional accommodation.',
    url: 'https://m3padelacademy.com/en/m3-padel-week/',
    court: 'padel',
  },
] as const

export default function CourtTripsPreview() {
  const [selected, setSelected] = useState(0)
  const trip = trips[selected]

  return (
    <div className="space-y-4">
      <PreviewPicker label="Filter trips by sport" options={trips.map(item => item.sport)} selected={selected} onSelect={setSelected} />
      <div className="overflow-hidden rounded-2xl border border-[var(--panel-border)] sm:grid sm:grid-cols-[10rem_1fr]">
        <div className="flex items-center justify-center bg-[#24463d] px-4 py-3 sm:p-4" aria-hidden="true">
          <svg viewBox="0 0 160 96" className="h-20 w-36 sm:h-auto sm:w-full">
            <rect x="6" y="6" width="148" height="84" rx="11" fill="#355b50" />
            <g fill="none" stroke="#d9e7c3" strokeWidth="1.6">
              <rect x="17" y="18" width="126" height="60" />
              <path d="M80 14v68" strokeWidth="2" />
              {trip.court === 'tennis' && <path d="M17 27h126m-126 42h126M48 27v42m64-42v42M48 48h64" />}
              {trip.court === 'pickleball' && <path d="M60 18v60m40-60v60M17 48h43m40 0h43" />}
              {trip.court === 'padel' && <path d="M42 18v60m76-60v60M42 48h76" />}
            </g>
          </svg>
        </div>
        <div className="bg-[var(--bg)] p-5 sm:p-6">
          <div aria-live="polite">
            <p className="flex items-center gap-1.5 text-xs font-medium text-moss-dark dark:text-moss-light"><MapPin size={14} aria-hidden="true" /> {trip.location}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight">{trip.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{trip.details}</p>
          </div>
          <a href={trip.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current dark:text-moss-light">
            View on {trip.organizer} <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
