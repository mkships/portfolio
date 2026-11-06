'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#tinkertank', label: 'Tinkertank' },
  { href: '/#beyondwork', label: 'Beyond Work' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <header
      id="top"
      tabIndex={-1}
      className="relative mx-auto max-w-3xl px-4 pt-4 sm:px-6 sm:pt-6 focus:outline-none md:pt-10"
      onKeyDown={event => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}
    >
      <div className="flex items-center gap-3 border-b border-[var(--panel-border)] pb-4 md:gap-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          aria-label="Manohar Kanapaka home"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-moss-dark dark:bg-[#e7edc7] dark:text-zinc-900 dark:hover:bg-moss-light"
        >
          MK
        </Link>

        <nav
          id="site-navigation"
          aria-label="Main navigation"
          className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-4 top-full sm:inset-x-6 z-30 flex-col gap-1 rounded-xl border border-[var(--panel-border)] bg-[var(--card)] p-2 shadow-lg md:static md:ml-auto md:flex md:flex-row md:items-center md:gap-5 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm md:min-h-0 font-medium text-zinc-800 transition-colors hover:bg-[var(--panel)] hover:text-moss-dark md:px-1 md:hover:bg-transparent dark:text-zinc-200 dark:hover:text-moss-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--panel-border)] transition-colors hover:bg-[var(--panel)] md:hidden"
          >
            {menuOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
