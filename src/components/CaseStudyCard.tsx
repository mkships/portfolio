import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface CaseStudyCardProps {
  post: PostMeta
  compact?: boolean
}

export default function CaseStudyCard({ post, compact = false }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${post.slug}`} className="group block">
      <article className="bg-surface border border-border rounded-lg overflow-hidden hover:-translate-y-0.5 transition-transform duration-300">
        {/* Color block placeholder */}
        <div
          className="h-32 w-full"
          style={{ backgroundColor: post.coverColor || '#2a2a2a' }}
        />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            {post.date && (
              <span className="text-text-secondary text-sm">{post.date}</span>
            )}
            {post.tags && post.tags.length > 0 && (
              <span className="text-accent text-sm">{post.tags[0]}</span>
            )}
          </div>
          <h3 className="font-sans font-semibold text-lg text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
            {post.title}
          </h3>
          {!compact && post.excerpt && (
            <p className="text-text-secondary text-sm line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <span className="inline-block mt-3 text-accent text-sm group-hover:underline">
            Read →
          </span>
        </div>
      </article>
    </Link>
  )
}
