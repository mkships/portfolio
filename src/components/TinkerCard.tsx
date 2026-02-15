import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface TinkerCardProps {
  project: PostMeta
}

const statusConfig = {
  live: { color: 'text-green-500', dot: 'bg-green-500' },
  wip: { color: 'text-yellow-500', dot: 'bg-yellow-500' },
  beta: { color: 'text-moss dark:text-moss-light', dot: 'bg-moss' },
  'coming-soon': { color: 'text-zinc-400', dot: 'bg-zinc-400' },
}

export default function TinkerCard({ project }: TinkerCardProps) {
  const status = project.status || 'wip'
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.wip

  return (
    <Link href={`/products/${project.slug}`} className="group block">
      <article className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-white/90 dark:bg-zinc-900/90 rounded-full backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
          </span>
          <span className={`text-[10px] font-mono uppercase tracking-wide ${config.color}`}>
            {status}
          </span>
        </div>

        {/* Background Logo/Image */}
        {project.image ? (
          <div className="w-full h-full flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900">
            <img
              src={project.image.startsWith('/') ? project.image : `/${project.image}`}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: project.coverColor || '#e5e5e5' }}
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-zinc-950/80 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-zinc-100 text-lg font-semibold lowercase mb-1">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs mb-4 italic leading-relaxed">
            {project.description || project.tagline}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-moss/20 border border-moss/40 rounded-full text-[9px] text-moss-light uppercase tracking-widest font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
