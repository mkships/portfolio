import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="mt-16 py-4 animate-fadeInUp">
      <div className="space-y-10">
        <h1 className="text-[40px] md:text-[56px] font-bold tracking-[-0.04em] leading-[1] lowercase text-zinc-900 dark:text-zinc-100">
          {bio.headline}
        </h1>
        <div className="space-y-8 text-lg md:text-xl leading-[1.7] tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 lowercase">
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
