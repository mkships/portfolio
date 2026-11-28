import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

// Top bar of the learning space: the MK mark leads back to the main site, then a breadcrumb.
// Internal links use /learn/... so they work on a preview and on localhost; on the
// learn. subdomain the server shortens them.
export default function LearnHeader({ current }: { current?: string }) {
  return (
    <header className="lp-top">
      <a href="https://mkanapaka.space" className="lp-mark" aria-label="Manohar Kanapaka, main site">
        MK
      </a>
      <nav aria-label="Learning" className="lp-top-links">
        <Link href="/learn" aria-current={current ? undefined : 'page'}>
          Learning
        </Link>
        {current && (
          <span aria-current="page" className="lp-crumb">
            <span className="lp-sep" aria-hidden="true">
              /{' '}
            </span>
            {current}
          </span>
        )}
      </nav>
      <ThemeToggle />
    </header>
  )
}
