'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface PortraitCompareProps {
  after: string
  before: string
  alt: string
  sizes: string
  imageClassName?: string
}

const RESTING_POSITION = 8

/**
 * Before/after wipe for the hero portrait. The AI-enhanced photo sits on top and is
 * clipped from the left, revealing the original underneath as the handle moves right.
 */
export default function PortraitCompare({ after, before, alt, sizes, imageClassName = '' }: PortraitCompareProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null)
  const [position, setPosition] = useState(RESTING_POSITION)
  const [touched, setTouched] = useState(false)

  const moveTo = (clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
    setTouched(true)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    // Touch waits for a clearly horizontal drag so vertical swipes still scroll the page.
    const active = e.pointerType !== 'touch'
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active }
    e.currentTarget.setPointerCapture(e.pointerId)
    if (active) moveTo(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.active) {
      const dx = Math.abs(e.clientX - d.x)
      const dy = Math.abs(e.clientY - d.y)
      if (dx < 6 || dx < dy) return
      d.active = true
    }
    moveTo(e.clientX)
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id === e.pointerId) drag.current = null
  }

  const imageClasses = `pointer-events-none object-cover ${imageClassName}`

  return (
    <div
      ref={rootRef}
      className="group absolute inset-0 cursor-ew-resize touch-pan-y select-none rounded-[inherit] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-moss dark:has-[:focus-visible]:ring-moss-light"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <Image src={before} alt="" fill draggable={false} className={imageClasses} sizes={sizes} />
      <Image
        src={after}
        alt={alt}
        fill
        draggable={false}
        priority
        className={imageClasses}
        sizes={sizes}
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-[#fbf6ee] shadow-[0_0_6px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fbf6ee] text-[#24251d] shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
          <ChevronLeft className="-mr-1 h-3 w-3" strokeWidth={2.5} />
          <ChevronRight className="-ml-1 h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>

      <span
        aria-hidden="true"
        className={`portfolio-meta pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[color-mix(in_srgb,var(--panel)_85%,transparent)] px-2 py-0.5 backdrop-blur transition-opacity duration-500 motion-reduce:transition-none ${touched ? 'opacity-0' : 'opacity-100'}`}
      >
        Original
        <ArrowLeftRight className="h-2.5 w-2.5" strokeWidth={2} />
        AI-enhanced
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(position)}
        onChange={(e) => {
          setPosition(Number(e.target.value))
          setTouched(true)
        }}
        aria-label="Compare original and AI-enhanced photo"
        aria-valuetext={`${Math.round(position)}% original`}
        className="sr-only"
      />
    </div>
  )
}
