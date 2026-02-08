import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface TinkerCardProps {
  project: PostMeta
}

export default function TinkerCard({ project }: TinkerCardProps) {
  return (
    <Link href={`/products/${project.slug}`} className="group block">
      <article className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
        <div
          className="w-full h-full"
          style={{ backgroundColor: project.coverColor || '#e5e5e5' }}
        />
        <div className="absolute inset-0 bg-zinc-950/80 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3 className="text-zinc-100 text-lg font-semibold lowercase mb-1">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs mb-4 italic leading-relaxed">
            {project.description || project.tagline}
          </p>
          <div className="flex gap-2 flex-wrap">
            {project.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-moss/20 border border-moss/30 rounded-full text-[9px] text-moss-light uppercase tracking-widest font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
