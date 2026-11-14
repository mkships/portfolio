'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { MusingEmbed as Embed } from '@/lib/musings'

const providers = { linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube' }

interface XWidgets {
  createTweet(id: string, container: HTMLElement, options: { dnt: boolean; theme: string }): Promise<HTMLElement | undefined>
}

let xWidgets: Promise<XWidgets> | undefined

function loadXWidgets() {
  xWidgets ??= new Promise<XWidgets>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.onload = () => {
      const widgets = (window as Window & { twttr?: { widgets?: XWidgets } }).twttr?.widgets
      if (widgets?.createTweet) resolve(widgets)
      else reject(new Error('X widgets are unavailable'))
    }
    script.onerror = () => reject(new Error('Could not load X widgets'))
    document.head.append(script)
  }).catch(error => {
    xWidgets = undefined
    throw error
  })
  return xWidgets
}

function XPost({ id }: { id: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  useEffect(() => {
    const target = document.createElement('div')
    host.current?.append(target)
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

    loadXWidgets().then(async widgets => {
      if (!target.isConnected) return
      const post = await widgets.createTweet(id, target, { dnt: true, theme })
      if (target.isConnected) setStatus(post ? 'ready' : 'failed')
    }).catch(() => {
      if (target.isConnected) setStatus('failed')
    })

    return () => target.remove()
  }, [id])

  return (
    <>
      {status !== 'ready' && (
        <p role="status" className="text-sm text-zinc-600 dark:text-zinc-400">
          {status === 'loading' ? 'Loading X embed…' : 'The X embed is unavailable. Use the original link above.'}
        </p>
      )}
      <div ref={host} />
    </>
  )
}

export default function MusingEmbed({ embed, title }: { embed: Embed; title: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const provider = providers[embed.provider]

  // Rendered inside a wrapping flex row: the button sits beside the link, the panel takes its own line.
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(value => !value)}
        className="min-h-11 rounded-lg border border-[var(--panel-border)] px-3 text-sm font-medium text-moss-dark hover:bg-[var(--panel)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light"
      >
        {open ? 'Hide' : 'Load'} {provider} embed
      </button>
      <div id={panelId} hidden={!open} className="mt-3 basis-full overflow-hidden rounded-lg">
        {open && (embed.provider === 'x' ? (
          <XPost id={embed.id} />
        ) : (
          <iframe
            src={embed.provider === 'linkedin' ? embed.src : `https://www.youtube-nocookie.com/embed/${embed.id}`}
            title={`${title} on ${provider}`}
            className={embed.provider === 'linkedin' ? 'h-[32rem] w-full' : 'aspect-video w-full'}
            allow={embed.provider === 'youtube' ? 'encrypted-media; fullscreen; picture-in-picture' : undefined}
            allowFullScreen
          />
        ))}
      </div>
    </>
  )
}
