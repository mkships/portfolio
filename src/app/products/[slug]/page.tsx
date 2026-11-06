import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, ExternalLink } from 'lucide-react'
import type { ComponentType } from 'react'
import { getPostBySlug, getAllSlugs, statusLabels } from '@/lib/posts'
import LaCafePreview from '@/components/project-previews/LaCafePreview'
import CourtTripsPreview from '@/components/project-previews/CourtTripsPreview'
import CourtsideBioPreview from '@/components/project-previews/CourtsideBioPreview'
import StartdotdevPreview from '@/components/project-previews/StartdotdevPreview'
import { projectBrands } from '@/lib/project-branding'

const projectPreviews: Partial<Record<string, {
  label: string
  title: string
  intro: string
  linkLabel?: string
  Component: ComponentType
}>> = {
  'la-cafe': {
    label: 'From the menu',
    title: 'A few things you can order',
    intro: 'Switch between four dishes from the customer menu. The wordmark and dish imagery come from La Cafe’s own site.',
    linkLabel: 'Open the full menu',
    Component: LaCafePreview,
  },
  'court-trips': {
    label: 'Directory walkthrough',
    title: 'Find a trip by sport',
    intro: 'Try three listings from the directory, then visit the organizer for dates and booking.',
    Component: CourtTripsPreview,
  },
  courtsidebio: {
    label: 'Fictional coach profile',
    title: 'See what a player sees',
    intro: 'Choose a service and a time to preview the inquiry a player could send.',
    Component: CourtsideBioPreview,
  },
  startdotdev: {
    label: 'Illustrative workflow',
    title: 'From a growth hypothesis to a test',
    intro: 'Walk through a fictional onboarding email to see where an agent can help and where I’d make the call.',
    Component: StartdotdevPreview,
  },
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

  const preview = projectPreviews[slug]

  return (
    <div className={`mx-auto flex flex-col gap-6 px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14 ${preview ? 'max-w-3xl' : 'max-w-2xl'}`}>
      <Link href="/#tinkertank" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium hover:text-moss dark:hover:text-moss-light">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Tinkertank
      </Link>

      <article className="motion-safe:animate-fadeInUp">
        <header className="portfolio-panel space-y-3">
          <p className="portfolio-kicker">Tinkertank{post.role ? ` · ${post.role}` : post.status && ` · ${statusLabels[post.status]}`}</p>
          <h1 className="text-pretty text-[2rem] sm:text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {post.tagline || post.description}
          </p>

          {(preview || post.url) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              {preview && (
                <a href="#project-preview" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-moss-dark px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-moss dark:bg-moss-light dark:text-zinc-950">
                  Explore the preview <ArrowDown size={14} aria-hidden="true" />
                </a>
              )}
              {post.url && (
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current dark:text-moss-light">
                  {preview?.linkLabel || 'Visit project'} <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </header>

        {preview && (
          <section id="project-preview" className="mt-7 scroll-mt-6 rounded-[1.5rem] border border-[var(--panel-border)] bg-[var(--card)] p-4 sm:p-6">
            <div className="mb-5">
              <p className="portfolio-kicker">{preview.label}</p>
              <h2 className="mt-2 text-pretty text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{preview.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{preview.intro}</p>
            </div>
            <preview.Component />
          </section>
        )}

        {/* Body */}
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
        <div className="mt-14 border-t border-zinc-100 dark:border-zinc-800 pt-6 sm:mt-24 sm:pt-12">
          <Link href="/#tinkertank" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← back to tinkertank
          </Link>
        </div>
      </article>
    </div>
  )
}
