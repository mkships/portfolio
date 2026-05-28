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
      <div className="mt-[72px] md:mt-24 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] lowercase text-zinc-900 dark:text-zinc-100 mb-3">
          {title}
        </h2>
        <p className="text-moss dark:text-moss-light lowercase text-sm italic">
          {subtitle}
        </p>
      </div>
      {children}
    </section>
  )
}
