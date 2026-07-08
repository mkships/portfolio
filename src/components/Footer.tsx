'use client'

const socials = [
  {
    label: 'x (twitter)',
    href: 'https://x.com/mkanapaka',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: 'instagram',
    href: 'https://instagram.com/mkanapaka',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'linkedin',
    href: 'https://linkedin.com/in/mkanapaka',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 py-12 border-t border-zinc-200/70 dark:border-zinc-900 flex flex-col md:flex-row items-center md:justify-between gap-8">
      <div className="flex items-center gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-moss hover:text-moss dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-moss-light dark:hover:text-moss-light"
          >
            {s.icon}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-medium text-[10px]">
            MK
          </div>
          <span className="text-[11px] text-zinc-400">
            &copy; 2026 manohar kanapaka
          </span>
        </div>

        {/* Rotating stamp */}
        <div className="group cursor-pointer">
          <div className="relative w-16 h-16">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-spin-slow group-hover:text-moss text-zinc-300 dark:text-zinc-700 transition-colors duration-300"
            >
              <defs>
                <path
                  id="stampCircle"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text
                fill="currentColor"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="500"
                letterSpacing="4"
              >
                <textPath href="#stampCircle">
                  BUILT WITH CLAUDE CODE • 100% •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-moss transition-colors duration-300">
                ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
