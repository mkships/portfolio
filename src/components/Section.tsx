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
        <h2 className="text-xl md:text-2xl leading-[1.2] font-semibold tracking-[-0.02em] lowercase mt-[72px] md:mt-24 mb-5 md:mb-7 text-zinc-900 dark:text-zinc-100">
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
