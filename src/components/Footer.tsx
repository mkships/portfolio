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

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-medium text-[10px]">
          MK
        </div>
        <span className="text-[11px] text-zinc-400 lowercase">
          &copy; 2026 manohar kanapaka
        </span>
      </div>
    </footer>
  )
}
