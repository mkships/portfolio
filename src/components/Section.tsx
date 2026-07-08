import { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  subtitle: string
  children: ReactNode
}

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mt-14 md:mt-16 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.01em] leading-[1.1] text-zinc-900 dark:text-zinc-100 mb-3">
          {title}
        </h2>
        <p className="text-moss dark:text-moss-light text-sm italic">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  )
}
