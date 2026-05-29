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

  const statusInner = (
    <>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>status — {status}</span>
      {project.url && <ArrowUpRight size={12} />}
    </>
  )

  return (
    <article className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-4 flex items-center gap-4">
      {/* Thumbnail */}
      <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        {project.image ? (
          <img
            src={project.image.startsWith('/') ? project.image : `/${project.image}`}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: project.coverColor || '#e5e5e5' }}
          />
        )}
      </div>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-semibold leading-[1.3] lowercase text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1.5 text-sm italic text-zinc-600 dark:text-zinc-400 leading-[1.5] lowercase">
            {project.description}
          </p>
        )}
      </div>

      {/* Right rail: status (deeplink if url) + tag */}
      <div className="shrink-0 flex flex-col items-end gap-1.5 text-right">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide ${config.text} hover:underline`}
            aria-label={`Open ${project.title}`}
          >
            {statusInner}
          </a>
        ) : (
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide ${config.text}`}>
            {statusInner}
          </span>
        )}
        {project.tags?.length > 0 && (
          <span className="text-[10px] text-zinc-500 lowercase">
            {project.tags.join(' · ')}
          </span>
        )}
      </div>
    </article>
  )
}
