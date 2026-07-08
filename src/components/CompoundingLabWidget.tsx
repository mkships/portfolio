'use client'

import { useState, useEffect } from 'react'
import { X, Sparkles, FlaskConical } from 'lucide-react'
import CompoundingLab from './CompoundingLab'

export default function CompoundingLabWidget() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Lock body scroll only for the mobile bottom-sheet; on desktop it's a
  // non-modal corner widget, so the page stays scrollable.
  useEffect(() => {
    if (open && typeof window !== 'undefined' && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Inline trigger inside the weight-loss content */}
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-surface px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-tennis dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-moss-light"
      >
        <Sparkles size={14} className="text-moss transition-transform group-hover:rotate-12 dark:text-moss-light" />
        Model the transformation math yourself!
      </button>

      {/* Persistent floating launcher (bottom-right) — hidden while open */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Transform Yourself"
        className={`group fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-tennis px-4 py-3 text-sm font-medium text-zinc-900 shadow-lg shadow-tennis/30 transition-all duration-300 hover:bg-tennis/90 hover:shadow-xl
          ${open ? 'pointer-events-none translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <FlaskConical size={16} className="transition-transform group-hover:-rotate-12" />
        <span className="hidden sm:inline">Transform Yourself</span>
      </button>

      {/* Mobile-only backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] sm:hidden"
          aria-hidden="true"
        />
      )}

      {/* Floating panel — fixed corner on desktop, bottom sheet on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Transform Yourself"
        className={`fixed z-50 flex flex-col overflow-hidden border border-zinc-200 bg-surface shadow-2xl transition-all duration-300 ease-out dark:border-zinc-800 dark:bg-zinc-900
          inset-x-3 bottom-3 max-h-[85vh] rounded-2xl
          sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-h-[calc(100vh-3rem)]
          ${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-moss dark:bg-moss-light" />
              Transform Yourself
            </span>
            <p className="mt-0.5 pl-3.5 text-[11px] italic text-zinc-400 dark:text-zinc-500">
              Small daily wins compound into big transformations.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-tennis hover:text-moss dark:border-zinc-700 dark:hover:border-moss-light dark:hover:text-moss-light"
            aria-label="Close Transform Yourself"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">
          <CompoundingLab />
        </div>
      </div>
    </>
  )
}
