import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('case-studies')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('case-studies', slug)

  if (!post) {
    return { title: 'Not Found' }
  }

  return {
    title: `${post.title} | Case Studies`,
    description: post.excerpt,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('case-studies', slug)
  const allSlugs = getAllSlugs('case-studies')

  // Find next case study (rotating: 1 → 2 → 3 → ... → 1)
  const currentIndex = allSlugs.indexOf(slug)
  const nextIndex = (currentIndex + 1) % allSlugs.length
  const nextSlug = allSlugs[nextIndex]

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24">
      {/* Detail Header */}
      <header className="flex items-center justify-between">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm font-medium hover:text-moss transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          back to work
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
            {post.description || post.excerpt}
          </p>
          {(post.year || post.date) && (
            <p className="text-sm text-zinc-500">{post.year || post.date}</p>
          )}
        </div>

        {/* Body */}
        <div
          className="prose prose-zinc dark:prose-invert max-w-none
prose-headings:font-semibold prose-headings:tracking-[-0.02em]
            prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-12
            prose-p:text-zinc-700 prose-p:dark:text-zinc-300 prose-p:leading-[1.75] prose-p:text-base
            prose-li:text-zinc-700 prose-li:dark:text-zinc-300 prose-li:leading-[1.75]
            prose-a:text-moss prose-a:no-underline hover:prose-a:underline"
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

        {/* Navigation Footer */}
        <div className="mt-24 border-t border-zinc-100 dark:border-zinc-800 pt-12 flex justify-between items-center">
          <Link href="/#work" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← back to all work
          </Link>
          <Link href={`/case-studies/${nextSlug}`} className="flex items-center gap-2 text-sm font-semibold text-moss hover:translate-x-1 transition-transform">
            next case study <ArrowRight size={14} />
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
