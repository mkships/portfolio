import { Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-12 py-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex items-center gap-10 text-sm font-medium lowercase">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-moss transition-colors">
          <Linkedin size={14} strokeWidth={2.5} /> linkedin
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-moss transition-colors">
          <Twitter size={14} strokeWidth={2.5} /> twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-moss transition-colors">
          <Instagram size={14} strokeWidth={2.5} /> instagram
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
