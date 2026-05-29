import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="mt-10 py-4 animate-fadeInUp">
      <div className="space-y-6">
        <h1 className="text-[32px] md:text-[44px] font-bold tracking-[-0.04em] leading-[1.1] lowercase text-zinc-900 dark:text-zinc-100">
          {bio.headline}
        </h1>
        <div className="space-y-8 text-base md:text-lg leading-[1.7] tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 lowercase">
          {bio.subheadline && <p>{bio.subheadline}</p>}
          <div
            className="space-y-8 [&>p]:leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: bio.content }}
          />
        </div>
      </div>
    </section>
  )
}
