'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PostMeta } from '@/lib/types'

interface TinkerCardProps {
  project: PostMeta
}

const statusConfig = {
  live: { text: 'text-green-500', dot: 'bg-green-500' },
  wip: { text: 'text-yellow-500', dot: 'bg-yellow-500' },
  beta: { text: 'text-moss dark:text-moss-light', dot: 'bg-moss' },
  'coming-soon': { text: 'text-zinc-400', dot: 'bg-zinc-400' },
}

export default function TinkerCard({ project }: TinkerCardProps) {
  const status = project.status || 'wip'
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.wip

  const handleDeeplink = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Link href={`/products/${project.slug}`} className="group block">
      <article className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-moss dark:hover:border-moss-light transition-colors">
        {/* Background image / colour */}
        <div className="absolute inset-0 opacity-25 grayscale group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-500">
          {project.image ? (
            <img
              src={project.image.startsWith('/') ? project.image : `/${project.image}`}
              alt=""
              className="w-full h-full object-contain p-8"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ backgroundColor: project.coverColor || '#e5e5e5' }}
            />
          )}
        </div>

        {/* Foreground content */}
        <div className="relative h-full p-4 flex flex-col">
          {/* Top row: status */}
          <div className="flex justify-end mb-1">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${config.dot}`} />
              <span className={`text-[10px] font-mono uppercase tracking-wide ${config.text}`}>
                {status}
              </span>
            </div>
          </div>

          {/* App name */}
          <h3 className="text-base md:text-lg font-semibold leading-[1.25] lowercase text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>

          {/* Spacer pushes footer to bottom */}
          <div className="flex-1" />

          {/* Bottom row: tags + deeplink */}
          <div className="flex justify-between items-end gap-3">
            <div className="flex gap-2 flex-wrap min-w-0">
              {project.tags?.map(tag => (
                <span key={tag} className="text-[10px] text-zinc-500 lowercase">
                  {tag}
                </span>
              ))}
            </div>
            {project.url && (
              <button
                type="button"
                onClick={handleDeeplink}
                className="flex items-center gap-1 text-xs font-medium text-moss dark:text-moss-light opacity-0 group-hover:opacity-100 transition-opacity hover:underline whitespace-nowrap"
                aria-label={`Open ${project.title}`}
              >
                deeplink <ArrowUpRight size={12} />
              </button>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
