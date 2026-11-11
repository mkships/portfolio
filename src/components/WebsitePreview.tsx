'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { WebsitePreviewData } from '@/lib/types'

function contains(element: HTMLElement | null, target: EventTarget | null) {
  return target instanceof Node && Boolean(element?.contains(target))
}

function getPlacement(container: HTMLDivElement, link: HTMLAnchorElement) {
  const bounds = container.getBoundingClientRect()
  const anchor = link.getBoundingClientRect()
  const width = Math.min(320, bounds.width)
  const left = Math.min(Math.max(anchor.left - bounds.left, 0), bounds.width - width)
  const roomBelow = window.innerHeight - anchor.bottom
  const above = roomBelow < width * 0.525 + 72 && anchor.top > roomBelow
  const edge = above ? { bottom: bounds.bottom - anchor.top } : { top: anchor.bottom - bounds.top }
  return { above, style: { left, width, ...edge } }
}

export default function WebsitePreview({ previews, children }: { previews: WebsitePreviewData[]; children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLAnchorElement | null>(null)
  const closeTimer = useRef<number>(0)
  const [active, setActive] = useState<(ReturnType<typeof getPlacement> & { preview: WebsitePreviewData }) | null>(null)

  useEffect(() => {
    function close() {
      window.clearTimeout(closeTimer.current)
      setActive(null)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }
    function onScroll() {
      if (!card.current || !container.current || !trigger.current) return
      const placement = getPlacement(container.current, trigger.current)
      setActive(current => current && { ...current, ...placement })
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(closeTimer.current)
    }
  }, [])

  function getLink(target: EventTarget | null) {
    const link = target instanceof Element ? target.closest('a') : null
    if (!link) return null
    const preview = previews.find(candidate => candidate.url === link.href)
    return preview ? { link, preview } : null
  }

  function show({ link, preview }: { link: HTMLAnchorElement; preview: WebsitePreviewData }) {
    if (!container.current) return

    window.clearTimeout(closeTimer.current)
    trigger.current = link
    setActive({ ...getPlacement(container.current, link), preview })
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      if (!trigger.current?.matches(':hover, :focus-visible') && !card.current?.matches(':hover')) {
        setActive(null)
      }
    }, 120)
  }

  return (
    <div
      ref={container}
      className="relative"
      onPointerOver={event => {
        if (event.pointerType === 'touch') return
        const match = getLink(event.target)
        if (match && !contains(match.link, event.relatedTarget)) show(match)
        if (contains(card.current, event.target)) window.clearTimeout(closeTimer.current)
      }}
      onPointerOut={event => {
        if (event.pointerType === 'touch') return
        if (contains(trigger.current, event.target) || contains(card.current, event.target)) scheduleClose()
      }}
      onFocus={event => {
        const match = getLink(event.target)
        if (match?.link.matches(':focus-visible')) show(match)
      }}
      onBlur={event => {
        if (getLink(event.target)) scheduleClose()
      }}
    >
      {children}
      {active && (
        <div
          ref={card}
          aria-hidden="true"
          data-website-preview=""
          className={`absolute z-20 ${active.above ? 'pb-2' : 'pt-2'}`}
          style={active.style}
        >
          <div className="overflow-hidden rounded-xl border border-[var(--panel-border)] bg-[var(--card)] shadow-xl">
            {active.preview.image && (
              <Image src={active.preview.image} alt="" width={640} height={336} unoptimized className="h-auto w-full border-b border-[var(--panel-border)]" />
            )}
            <div className="flex items-start justify-between gap-3 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{active.preview.title}</p>
                {active.preview.description && (
                  <p className="mt-1 text-sm leading-snug text-zinc-700 dark:text-zinc-300">{active.preview.description}</p>
                )}
                <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-zinc-400">{new URL(active.preview.url).hostname.replace(/^www\./, '')}</p>
              </div>
              <Globe size={16} className="mt-0.5 shrink-0 text-moss-dark dark:text-moss-light" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
