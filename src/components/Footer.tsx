import { Instagram } from 'lucide-react'

const socialInteractionClass = 'transition-[background-color,box-shadow,transform] hover:shadow-sm motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss dark:focus-visible:outline-moss-light'
const socialIconClass = `inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--panel-border)] hover:bg-[var(--card)] ${socialInteractionClass}`

export default function Footer() {
  return (
    <footer className="mx-auto mt-12 max-w-3xl px-4 pb-8 sm:mt-16 sm:px-6 md:mt-20 md:pb-12">
      <div className="portfolio-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-5">
        <div className="col-span-2 min-w-0 sm:col-span-1">
          <p className="portfolio-kicker">Say hello</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Want to talk product, agents, or tennis?
          </p>
        </div>
        <div className="contents text-sm font-medium sm:col-start-1 sm:row-start-2 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="https://x.com/mkanapaka"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message me on X"
              className={`col-span-2 row-start-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 ${socialInteractionClass}`}
            >
              Message me on
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
          <div className="col-start-1 row-start-3 flex items-center gap-3 sm:gap-4">
            <a href="https://linkedin.com/in/mkanapaka" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialIconClass}>
              <svg viewBox="0 0 24 24" fill="#0a66c2" className="h-5 w-5 rounded-sm bg-white" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
            <a href="https://instagram.com/mkanapaka" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialIconClass}>
              <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-[radial-gradient(circle_at_20%_95%,#ffd776,#f77737_28%,#e1306c_57%,#833ab4_82%,#5851db)] text-white" aria-hidden="true">
                <Instagram size={15} strokeWidth={1.9} />
              </span>
            </a>
          </div>
        </div>
        <a
          href="#top"
          aria-label="Back to top — Manohar Kanapaka"
          title="Back to top"
          className="footer-stamp col-start-2 row-start-3 block h-20 w-20 justify-self-end rounded-full text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss sm:row-span-2 sm:row-start-1 sm:h-28 sm:w-28 dark:text-[#e7edc7] dark:focus-visible:outline-moss-light"
        >
        <svg
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="block h-full w-full"
        >
          <defs>
            <path id="footer-name-top" d="M 16 60 A 44 44 0 0 1 104 60" />
            <path id="footer-name-bottom" d="M 9 60 A 51 51 0 0 0 111 60" />
          </defs>
          <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="32" fill="currentColor" />
          <g fill="currentColor" fontSize="10" letterSpacing="2.2" className="font-sans font-semibold">
            <text><textPath href="#footer-name-top" startOffset="50%" textAnchor="middle">MANOHAR</textPath></text>
            <text><textPath href="#footer-name-bottom" startOffset="50%" textAnchor="middle">KANAPAKA</textPath></text>
          </g>
          <circle cx="14" cy="60" r="1.5" fill="currentColor" />
          <circle cx="106" cy="60" r="1.5" fill="currentColor" />
          <text x="60" y="60" dy=".35em" textAnchor="middle" fontSize="23" letterSpacing="-1" className="fill-white font-sans font-semibold dark:fill-zinc-900">MK</text>
        </svg>
        </a>
      </div>
      <div className="mt-5 flex flex-wrap justify-between gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
        <p>&copy; 2026 Manohar Kanapaka</p>
        <p>Built with Claude Code and Codex</p>
      </div>
    </footer>
  )
}
