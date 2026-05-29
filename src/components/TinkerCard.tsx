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
    <article className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-4 flex items-center gap-4 hover:border-moss dark:hover:border-moss-light transition-colors">
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

      {/* 2x2 content grid: name|status on row 1, description|label on row 2 */}
      <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 items-baseline">
        <h3 className="col-start-1 row-start-1 text-sm md:text-base font-semibold leading-[1.3] lowercase text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`col-start-2 row-start-1 justify-self-end inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide ${config.text} hover:underline`}
            aria-label={`Open ${project.title}`}
          >
            {statusInner}
          </a>
        ) : (
          <span className={`col-start-2 row-start-1 justify-self-end inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide ${config.text}`}>
            {statusInner}
          </span>
        )}

        {project.description && (
          <p className="col-start-1 row-start-2 text-sm italic text-zinc-600 dark:text-zinc-400 leading-[1.5] lowercase">
            {project.description}
          </p>
        )}

        {project.tags?.length > 0 && (
          <span className="col-start-2 row-start-2 justify-self-end text-[10px] text-zinc-500 lowercase whitespace-nowrap">
            {project.tags.join(' · ')}
          </span>
        )}
      </div>
    </article>
  )
}
