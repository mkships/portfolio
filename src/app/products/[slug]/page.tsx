import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('products')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('products', slug)

  if (!post) {
    return { title: 'Not Found' }
  }

  return {
    title: `${post.title} | AI/Vibe Coding`,
    description: post.tagline,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('products', slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24">
      {/* Detail Header */}
      <header className="flex items-center justify-between">
        <Link
          href="/#tinkertank"
          className="flex items-center gap-2 text-sm font-medium hover:text-moss transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          back to tinkertank
        </Link>

        <ThemeToggle />
      </header>

      <article className="animate-fadeInUp">
        {/* Hero Content */}
        <div className="space-y-3 border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-12">
          <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100">
            {post.title}
          </h1>
          <p className="text-moss dark:text-moss-light italic text-lg">
            {post.tagline}
          </p>
          {post.status && (
            <p className="text-sm text-zinc-500">status — {post.status}</p>
          )}

          {post.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-moss text-white font-medium rounded-full hover:bg-moss-dark transition-colors text-sm"
            >
              visit project <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Body */}
        <div
          className="prose prose-zinc dark:prose-invert max-w-none
prose-headings:font-semibold prose-headings:tracking-[-0.02em]
            prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-12
            prose-p:text-zinc-700 prose-p:dark:text-zinc-300 prose-p:leading-[1.75] prose-p:text-base
            prose-li:text-zinc-700 prose-li:dark:text-zinc-300 prose-li:leading-[1.75]
            prose-a:text-moss prose-a:no-underline hover:prose-a:underline
            prose-ul:text-zinc-700 prose-ul:dark:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-24 border-t border-zinc-100 dark:border-zinc-800 pt-12">
          <Link href="/#tinkertank" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← back to tinkertank
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
