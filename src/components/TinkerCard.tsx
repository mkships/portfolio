import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface TinkerCardProps {
  project: PostMeta
}

const statusDotColor: Record<string, string> = {
  live: 'bg-green-500',
  wip: 'bg-yellow-500',
  beta: 'bg-moss',
  'coming-soon': 'bg-zinc-400',
}

export default function TinkerCard({ project }: TinkerCardProps) {
  const status = project.status || 'wip'
  const dotColor = statusDotColor[status] || statusDotColor.wip

  return (
    <Link href={`/products/${project.slug}`} className="group block h-full">
      <article className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col h-full gap-4 hover:border-moss dark:hover:border-moss-light transition-colors">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold leading-[1.3] lowercase text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          <span className={`inline-block h-2 w-2 rounded-full ${dotColor} shrink-0`} title={status} />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-[1.6] lowercase">
          {project.description || project.tagline}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-auto pt-1">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs text-zinc-500 lowercase">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
