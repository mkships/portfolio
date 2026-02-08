import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface WorkCardProps {
  post: PostMeta
}

export default function WorkCard({ post }: WorkCardProps) {
  return (
    <Link href={`/case-studies/${post.slug}`} className="group block">
      <article className="h-full bg-surface border-l-2 border-l-accent border border-border p-4 hover:bg-surface/80 transition-colors">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors leading-tight">
            {post.title}
          </h3>
          {post.date && (
            <span className="text-xs text-text-secondary flex-shrink-0">{post.date}</span>
          )}
        </div>

        {post.excerpt && (
          <p className="text-xs text-text-secondary mb-3 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {post.tags && post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 bg-bg border border-border text-text-secondary"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-accent text-xs">→</span>
        </div>
      </article>
    </Link>
  )
}
