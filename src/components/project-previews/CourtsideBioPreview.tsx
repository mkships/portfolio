'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import PreviewPicker from './PreviewPicker'

const services = [
  { label: 'Coaching', price: '$65', details: 'Technique, tactics, and match preparation.' },
  { label: 'Hitting practice', price: '$45', details: 'A live-ball session at a competitive pace.' },
]
const slots = ['Tuesday, 6:00 PM', 'Thursday, 5:00 PM', 'Saturday, 9:00 AM']

export default function CourtsideBioPreview() {
  const [selectedService, setSelectedService] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(slots[0])
  const [showInquiry, setShowInquiry] = useState(false)
  const service = services[selectedService]

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--panel-border)]">
      <div className="flex items-center gap-4 bg-[#233c36] px-5 py-5 text-[#faf5e9] sm:px-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#799080] bg-[#35544a] font-display text-lg" aria-hidden="true">AM</div>
        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">Alex Morgan</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-[#e0e9df]">
            <MapPin size={13} aria-hidden="true" /> Austin, Texas · Tennis coach and hitting partner
          </p>
        </div>
      </div>
      <div className="space-y-4 bg-[var(--bg)] p-5 sm:p-6">
        <PreviewPicker
          label="Choose a service"
          options={services.map(item => item.label)}
          selected={selectedService}
          onSelect={index => {
            setSelectedService(index)
            setShowInquiry(false)
          }}
        />
        <p aria-live="polite" className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong className="mr-2 text-zinc-900 dark:text-zinc-100">{service.price} / session</strong>{service.details}
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-0 flex-1 basis-44 space-y-1.5 text-xs font-semibold">
            <span className="block">Typical availability · Austin time</span>
            <select
              value={selectedSlot}
              onChange={event => {
                setSelectedSlot(event.target.value)
                setShowInquiry(false)
              }}
              className="min-h-11 w-full rounded-lg border border-[var(--panel-border)] bg-[var(--card)] px-3 py-2 text-base font-normal sm:text-sm"
            >
              {slots.map(slot => <option key={slot}>{slot}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setShowInquiry(true)}
            className="min-h-11 rounded-full bg-moss-dark px-4 py-2 text-sm font-semibold text-white hover:bg-moss dark:bg-moss-light dark:text-zinc-950"
          >
            Preview inquiry
          </button>
        </div>
        <div aria-live="polite">
          {showInquiry && (
            <div className="rounded-xl border border-[var(--panel-border)] bg-[var(--card)] p-4 text-sm leading-relaxed">
              <p className="portfolio-kicker mb-2">Sample message</p>
              <p>Hi Alex, I’m interested in {service.label.toLowerCase()}. Would {selectedSlot} Austin time work for a session?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
