export default function Footer() {
  return (
    <footer className="mt-12 py-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex items-center gap-10 text-sm font-medium lowercase">
        <a href="https://x.com/mkanapaka" target="_blank" rel="noopener noreferrer" className="underline hover:text-moss transition-colors">
          x (twitter)
        </a>
        <a href="https://linkedin.com/in/mkanapaka" target="_blank" rel="noopener noreferrer" className="underline hover:text-moss transition-colors">
          linkedin
        </a>
      </div>

      <div className="flex flex-col items-center md:items-end gap-3">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">status: vibecoding</span>
          <div className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse"></div>
        </div>
        <p className="text-[10px] text-zinc-500 italic lowercase tracking-wider">
          built with human intuition and agentic workflows.
        </p>
      </div>
    </footer>
  )
}
