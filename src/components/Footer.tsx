'use client'

export default function Footer() {
  return (
    <footer className="mt-12 py-12 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
      <div className="flex items-center gap-10 text-sm font-medium lowercase">
        <a href="https://x.com/mkanapaka" target="_blank" rel="noopener noreferrer" className="underline hover:text-moss transition-colors">
          x (twitter)
        </a>
        <a href="https://linkedin.com/in/mkanapaka" target="_blank" rel="noopener noreferrer" className="underline hover:text-moss transition-colors">
          linkedin
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-medium text-[10px]">
            MK
          </div>
          <span className="text-[11px] text-zinc-400 lowercase">
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
                textTransform="uppercase"
              >
                <textPath href="#stampCircle">
                  VIBECODED 100% • VIBECODED 100% •
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
