import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface ProductCardProps {
  post: PostMeta
}

const statusLabels: Record<string, { label: string; className: string }> = {
  'coming-soon': {
    label: 'Coming Soon',
    className: 'bg-accent-dim/20 text-accent-dim',
  },
  beta: {
    label: 'Beta',
    className: 'bg-accent/20 text-accent',
  },
  live: {
    label: 'Live',
    className: 'bg-green-900/30 text-green-400',
  },
}

export default function ProductCard({ post }: ProductCardProps) {
  const status = post.status ? statusLabels[post.status] : null

  return (
    <Link href={`/products/${post.slug}`} className="group block">
      <article className="bg-surface border border-border rounded-lg overflow-hidden hover:-translate-y-0.5 transition-transform duration-300">
        {/* Color block placeholder */}
        <div
          className="h-32 w-full"
          style={{ backgroundColor: post.coverColor || '#2a2a2a' }}
        />
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-sans font-semibold text-lg text-text-primary group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h3>
            {status && (
              <span className={`text-xs px-2 py-1 rounded ${status.className}`}>
                {status.label}
              </span>
            )}
          </div>
          {post.tagline && (
            <p className="text-text-secondary text-sm mb-3">
              {post.tagline}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-text-secondary">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
