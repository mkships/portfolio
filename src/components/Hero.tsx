import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="mt-10 py-4 animate-fadeInUp">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-[1.15] lowercase text-zinc-900 dark:text-zinc-100 whitespace-pre-line">
            {bio.headline}
          </h1>
          {bio.subheadline && (
            <p className="text-sm md:text-base font-normal italic text-zinc-500 dark:text-zinc-400 lowercase whitespace-pre-line">
              {bio.subheadline}
            </p>
          )}
        </div>
        <div
          className="space-y-8 text-base md:text-lg leading-[1.7] tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 lowercase [&>p]:leading-[1.7]"
          dangerouslySetInnerHTML={{ __html: bio.content }}
        />
      </div>
    </section>
  )
}
