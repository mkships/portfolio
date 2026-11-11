import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MusingBody, MusingDate } from '@/components/MusingsList'
import { getMusingEssays } from '@/lib/musings'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getMusingEssays().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const essay = getMusingEssays().find(entry => entry.slug === slug)
  if (!essay) notFound()

  return { title: `${essay.title} | Musings`, description: essay.excerpt }
}

export default async function MusingEssayPage({ params }: Props) {
  const { slug } = await params
  const essay = getMusingEssays().find(entry => entry.slug === slug)
  if (!essay) notFound()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14">
      <Link href="/musings" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-moss-dark underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Musings
      </Link>

      <article>
        <header className="portfolio-panel mb-8 space-y-3 sm:mb-10">
          <MusingDate date={essay.date} />
          <h1 className="text-pretty text-[2rem] font-semibold leading-tight tracking-tight sm:text-4xl">{essay.title}</h1>
        </header>
        <MusingBody html={essay.body} />
      </article>
    </div>
  )
}
