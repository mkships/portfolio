import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteChrome from '@/components/SiteChrome'

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="mx-auto flex max-w-3xl flex-col px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14">
        <div className="portfolio-panel space-y-3">
          <p className="portfolio-meta">404</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">This page isn’t here</h1>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The link may be old, or the address may have a typo.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light"
          >
            Back to the home page <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </SiteChrome>
  )
}
