'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  const navLinks = [
    { href: '#work', label: 'work', emoji: '💻', hoverClass: 'group-hover:-rotate-12 group-hover:scale-110 transition-transform inline-block' },
    { href: '#tinkertank', label: 'tinkertank', emoji: '✨', hoverClass: 'group-hover:animate-spin' },
    { href: '#beyondwork', label: 'beyond work', emoji: '🎾', hoverClass: 'group-hover:animate-bounce' },
  ]

  return (
    <header className="flex items-center justify-between">
      <div className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-medium text-sm">
        MK
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8 md:gap-12 text-sm font-medium lowercase">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="flex items-center gap-1.5 hover:text-moss transition-colors group">
            {link.label} <span className={link.hoverClass}>{link.emoji}</span>
          </a>
        ))}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      {/* Mobile controls */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute top-20 left-0 right-0 z-50 mx-6 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium lowercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:text-moss transition-colors py-1"
              >
                <span>{link.emoji}</span> {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
