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
    <header className="relative flex items-center justify-between py-2">
      <div className="w-12 h-12 rounded-full bg-zinc-900 text-zinc-100 flex items-center justify-center font-semibold text-lg dark:bg-zinc-100 dark:text-zinc-900">
        MK
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10 text-lg font-medium">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="flex items-center gap-1.5 hover:text-moss dark:hover:text-moss-light transition-colors group">
            {link.label} <span className={link.hoverClass}>{link.emoji}</span>
          </a>
        ))}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>

      {/* Mobile controls */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute top-[calc(100%+0.75rem)] left-0 right-0 z-50 p-6 bg-[#fbf6ee] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg md:hidden">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 hover:text-moss dark:hover:text-moss-light transition-colors py-1"
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
