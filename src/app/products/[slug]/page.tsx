import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { projectBrands } from '@/lib/project-branding'
import { projectMeta } from '@/components/TinkerCard'
import type { Screenshot } from '@/lib/types'

function Shot({ shot, sizes, priority }: { shot: Screenshot; sizes: string; priority?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-[var(--panel-border)] bg-[var(--card)]">
        <Image src={shot.src} alt={shot.alt} width={1440} height={810} sizes={sizes} priority={priority} className="h-auto w-full" />
      </div>
      {shot.caption && (
        <figcaption className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{shot.caption}</figcaption>
      )}
    </figure>
  )
}

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

  const title = `${post.title} | Manohar Kanapaka`
  const description = post.tagline || post.description
  const images = [{ url: `/api/social/${slug}`, width: 1200, height: 630, alt: `${post.title} by Manohar Kanapaka` }]

  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    ...(projectBrands[slug] && {
      openGraph: { title, description, type: 'website', siteName: 'Manohar Kanapaka', url: `/products/${slug}`, images },
      twitter: { card: 'summary_large_image', creator: '@mkanapaka', title, description, images },
    }),
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('products', slug)

  if (!post) {
    notFound()
  }

  const [mainShot, ...moreShots] = post.screenshots
  const meta = projectMeta(post)

  return (
    <div className={`mx-auto flex flex-col gap-6 px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14 ${mainShot ? 'max-w-3xl' : 'max-w-2xl'}`}>
      <Link href="/#tinkertank" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium hover:text-moss dark:hover:text-moss-light">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Tinkertank
      </Link>

      <article className="motion-safe:animate-fadeInUp">
        <header className="portfolio-panel space-y-3">
          {meta && <p className="portfolio-meta">{meta}</p>}
          <h1 className="text-pretty text-[2rem] sm:text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {post.tagline || post.description}
          </p>
          {post.url && (
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light">
              Visit {post.title} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </header>

        {mainShot && (
          <div className="mt-7 space-y-5">
            <Shot shot={mainShot} sizes="(min-width: 768px) 720px, calc(100vw - 34px)" priority />
            {moreShots.length > 0 && (
              <div className={`grid gap-5 ${moreShots.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {moreShots.map(shot => (
                  <Shot key={shot.src} shot={shot} sizes={moreShots.length > 1 ? '(min-width: 640px) 350px, calc(100vw - 34px)' : '(min-width: 768px) 720px, calc(100vw - 34px)'} />
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className="article-copy prose prose-zinc mt-10 max-w-[65ch] dark:prose-invert
            prose-headings:font-semibold prose-headings:tracking-[-0.02em]
            prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-12
            prose-p:text-zinc-700 prose-p:dark:text-zinc-300 prose-p:leading-[1.75] prose-p:text-base
            prose-li:text-zinc-700 prose-li:dark:text-zinc-300 prose-li:leading-[1.75]
            prose-a:text-moss prose-a:no-underline hover:prose-a:underline
            prose-ul:text-zinc-700 prose-ul:dark:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  )
}
