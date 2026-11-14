'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/musings', label: 'Musings' },
  { href: '/#tinkertank', label: 'Tinkertank' },
  { href: '/#beyondwork', label: 'Beyond work' },
]

export default function Header({ openTo }: { openTo?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <header
      id="top"
      tabIndex={-1}
      className="focus:outline-none"
      onKeyDown={event => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}
    >
      {openTo && (
        <div className="border-b border-[var(--panel-border)] bg-[var(--card-mark)]">
          <p className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-0.5 px-4 py-2 text-sm font-medium text-zinc-800 sm:px-6 dark:text-zinc-200">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-moss dark:bg-tennis" aria-hidden="true" />
            <span className="min-w-0 flex-1 basis-56">{openTo}</span>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light"
            >
              Get in touch <ArrowDown size={15} aria-hidden="true" />
            </a>
          </p>
        </div>
      )}
      <div className="relative mx-auto max-w-3xl px-4 pt-4 sm:px-6 sm:pt-6 md:pt-10">
      <div className="flex items-center gap-3 border-b border-[var(--panel-border)] pb-4 md:gap-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          aria-label="Musings of a Product Guy, Manohar Kanapaka home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white transition-colors group-hover:bg-moss-dark dark:bg-[#e7edc7] dark:text-zinc-900 dark:group-hover:bg-moss-light">
            MK
          </span>
          <span className="hidden font-display text-lg font-semibold leading-tight tracking-tight text-zinc-900 sm:inline dark:text-zinc-100">
            Musings of a Product Guy
          </span>
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
      </div>
    </header>
  )
}
