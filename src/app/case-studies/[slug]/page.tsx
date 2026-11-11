import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import WebsitePreview from '@/components/WebsitePreview'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'

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
    description: post.description || post.excerpt,
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

  const highlights = post.highlights ?? (post.metric && post.metricLabel ? [{ value: post.metric, label: post.metricLabel }] : [])
  const summary = post.excerpt || post.description
  const body = (
    <div
      className="article-copy prose prose-zinc max-w-none dark:prose-invert
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:mb-4 prose-h2:mt-10 prose-h2:font-display prose-h2:text-2xl sm:prose-h2:text-3xl
        prose-p:text-base prose-p:leading-[1.75] prose-p:text-zinc-700 dark:prose-p:text-zinc-300
        prose-li:leading-[1.75] prose-li:text-zinc-700 dark:prose-li:text-zinc-300
        prose-a:text-moss-dark dark:prose-a:text-moss-light
        prose-blockquote:rounded-r-xl prose-blockquote:border-moss prose-blockquote:bg-[var(--panel)]
        prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:not-italic dark:prose-blockquote:border-moss-light
        [&_blockquote_p]:my-0 [&_blockquote_p]:font-display [&_blockquote_p]:text-xl [&_blockquote_p]:leading-snug"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  )

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14">
      <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-moss-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light">
        <ArrowLeft size={16} aria-hidden="true" /> Back to work
      </Link>

      <article className="motion-safe:animate-fadeInUp">
        <header className="portfolio-panel space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1.5">
            <p className="portfolio-meta">{['Case study', post.organization, post.year || post.date].filter(Boolean).join(' · ')}</p>
            {post.role && <p className="font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400">{post.role}</p>}
          </div>
          <h1 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            {post.title}
          </h1>
          {summary && (
            <p className="max-w-[60ch] text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">{summary}</p>
          )}
          {highlights.length > 0 && (
            <dl className="grid gap-3 pt-2 min-[440px]:grid-cols-2">
              {highlights.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1 rounded-xl border border-[var(--panel-border)] bg-[var(--card)] px-4 py-3 sm:px-5 sm:py-4">
                  <dt className="text-sm leading-snug text-zinc-700 dark:text-zinc-300">{label}</dt>
                  <dd className="order-first font-display text-3xl font-semibold leading-none text-moss-dark dark:text-moss-light">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        <div className="mx-auto mt-8 max-w-[65ch] sm:mt-10">
          {post.linkPreviews.length > 0 ? <WebsitePreview previews={post.linkPreviews}>{body}</WebsitePreview> : body}

          {post.tags?.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--panel-border)] px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <nav aria-label="Case study navigation" className="mt-10 flex flex-wrap items-center justify-between gap-x-5 border-t border-[var(--panel-border)] pt-4 sm:mt-14">
            <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300">
              <ArrowLeft size={14} aria-hidden="true" /> Back to work
            </Link>
            <Link href={`/case-studies/${nextSlug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-moss-dark underline-offset-4 hover:underline dark:text-moss-light">
              Next case study <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </article>
    </div>
  )
}
