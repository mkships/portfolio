'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <header className="flex items-center justify-between">
      <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-medium text-sm">
        MK
      </div>

      <nav className="flex items-center gap-8 md:gap-12 text-sm font-medium lowercase">
        <a href="#work" className="flex items-center gap-1.5 hover:text-moss transition-colors group">work <span className="group-hover:-rotate-12 group-hover:scale-110 transition-transform inline-block">💻</span></a>
        <a href="#tinkertank" className="flex items-center gap-1.5 hover:text-moss transition-colors group">tinkertank <span className="group-hover:animate-spin">✨</span></a>
        <div className="flex items-center gap-1.5 group cursor-pointer hover:text-moss transition-colors">
          <a href="#beyondwork">beyond work</a>
          <span className="group-hover:animate-bounce">🎾</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>
    </header>
  )
}
