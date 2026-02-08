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
      <div className="mb-8">
        <h2 className="text-lg font-semibold lowercase mb-1 text-zinc-900 dark:text-zinc-100">
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
