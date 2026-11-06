'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Sparkles } from 'lucide-react'
import CompoundingLab from './CompoundingLab'

export default function CompoundingLabWidget() {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const launcher = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const trigger = launcher.current
    closeButton.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      trigger?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!open || !mobile) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open, mobile])

  return (
    <>
      {/* Inline trigger inside the weight-loss content */}
      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen(true)}
        aria-controls="compounding-lab"
        aria-expanded={open}
        className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-zinc-200 bg-surface px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:border-tennis dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-moss-light"
      >
        <Sparkles size={14} className="text-moss transition-transform group-hover:rotate-12 dark:text-moss-light" />
        Try the fitness calculator
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
      {open && <div
        ref={dialog}
        id="compounding-lab"
        role="dialog"
        aria-modal={mobile || undefined}
        onKeyDown={event => {
          if (!mobile || event.key !== 'Tab') return
          const controls = dialog.current?.querySelectorAll<HTMLElement>('button, input, select, a[href]')
          if (!controls?.length) return
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        }}
        aria-label="Transform Yourself"
        className={`fixed z-50 flex flex-col overflow-hidden border border-zinc-200 bg-surface shadow-2xl motion-safe:animate-fadeInUp dark:border-zinc-800 dark:bg-zinc-900
          inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[85dvh] rounded-2xl
          sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:max-h-[calc(100vh-3rem)]
          `}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-moss dark:bg-moss-light" />
              Transform Yourself
            </span>
            <p className="mt-0.5 pl-3.5 text-xs text-zinc-400 dark:text-zinc-500">
              Small daily wins compound into big transformations.
            </p>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={() => setOpen(false)}
            className="ml-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-tennis hover:text-moss dark:border-zinc-700 dark:hover:border-moss-light dark:hover:text-moss-light"
            aria-label="Close Transform Yourself"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 overflow-y-auto overscroll-y-contain pb-[env(safe-area-inset-bottom)]">
          <CompoundingLab />
        </div>
      </div>}
    </>
  )
}
