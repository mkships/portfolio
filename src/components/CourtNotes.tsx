'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

const notes = [
  { image: 'blr', location: 'Bengaluru', caption: 'Clay court mornings' },
  { image: 'phuket2', location: 'Phuket', caption: 'Chasing a forehand' },
  { image: 'bangkok2', location: 'Bangkok', caption: 'Floodlit doubles' },
  { image: 'hyd', location: 'Hyderabad', caption: 'Hometown hard courts' },
  { image: 'phuket4', location: 'Phuket', caption: 'Serving with a view' },
  { image: 'hyd2', location: 'Hyderabad', caption: 'Pickleball match point' },
  { image: 'bangkok3', location: 'Bangkok', caption: 'Rallies under the lights' },
  { image: 'phuket5', location: 'Phuket', caption: 'The Phuket crew' },
  { image: 'bangkok1', location: 'Bangkok', caption: 'Late-night hits' },
  { image: 'phuket3', location: 'Phuket', caption: 'Island tennis' },
]

// Pixels per second: each print drifts past slowly enough to read its caption.
const driftSpeed = 18
const controlClass = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--panel-border)] text-moss-dark transition-colors hover:bg-[var(--panel)] disabled:opacity-35 dark:text-moss-light'

export default function CourtNotes() {
  const track = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  function browse(direction: number) {
    setPlaying(false)
    const element = track.current
    const firstStrip = element?.children[0] as HTMLElement | undefined
    const firstPhoto = firstStrip?.children[0] as HTMLElement | undefined
    const secondPhoto = firstStrip?.children[1] as HTMLElement | undefined
    if (!element || !firstStrip || !firstPhoto || !secondPhoto) return

    const step = secondPhoto.offsetLeft - firstPhoto.offsetLeft
    const loopWidth = firstStrip.offsetWidth
    // Move to the equivalent copy before stepping across the loop boundary.
    let position = element.scrollLeft % loopWidth
    if (direction < 0 && position < step) position += loopWidth
    element.scrollLeft = position
    element.scrollTo({
      left: position + direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const respectReducedMotion = () => {
      if (reducedMotion.matches) setPlaying(false)
    }
    respectReducedMotion()
    reducedMotion.addEventListener('change', respectReducedMotion)

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (track.current) observer.observe(track.current)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', respectReducedMotion)
    }
  }, [])

  useEffect(() => {
    if (!playing || hovered || !visible) return

    const element = track.current
    if (!element) return
    let frame: number
    let previousTime: number | undefined
    let position = element.scrollLeft

    function tick(time: number) {
      if (!element) return
      const firstStrip = element.children[0] as HTMLElement
      const loopWidth = firstStrip.offsetWidth
      if (previousTime !== undefined && loopWidth > 0) {
        // Cap the delta after a background tab resumes; retain subpixel progress.
        position = (position + Math.min(time - previousTime, 64) * driftSpeed / 1000) % loopWidth
        element.scrollLeft = position
      }
      previousTime = time
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [playing, hovered, visible])

  return (
    <div
      className="w-full min-w-0 rounded-2xl border border-[var(--panel-border)] bg-[var(--card)] p-3 sm:p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={event => {
        if (event.target.matches(':focus-visible') && !event.currentTarget.contains(event.relatedTarget)) setPlaying(false)
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="portfolio-kicker">Court notes</p>
          <p className="mt-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
            10 moments, on and off court
          </p>
        </div>
        <div className="flex gap-1.5">
          <button type="button" aria-label={playing ? 'Pause automatic scroll' : 'Play automatic scroll'} className={controlClass} onClick={() => setPlaying(value => !value)}>
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          </button>
          <button type="button" aria-label="Previous court photo" className={controlClass} onClick={() => browse(-1)}>
            <ArrowLeft size={15} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next court photo" className={controlClass} onClick={() => browse(1)}>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label="Court photos"
        tabIndex={0}
        className="court-notes-viewport focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-moss"
        onPointerDown={() => setPlaying(false)}
        onWheel={event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) setPlaying(false) }}
      >
        {[0, 1].map(copy => (
          <div key={copy} className="court-notes-strip" aria-hidden={copy === 1 ? true : undefined}>
            {notes.map(note => (
              <figure key={note.image} className="court-note-print">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/images/tennis-notes/${note.image}.webp`}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-1 pb-2 pt-3">
                  <p className="text-xs font-semibold leading-tight text-zinc-900 sm:text-sm">{note.location}</p>
                  <p className="mt-1 text-[11px] leading-snug text-zinc-600 sm:text-xs">{note.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
