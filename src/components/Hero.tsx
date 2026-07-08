import Image from 'next/image'
import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="mt-14 py-4 animate-fadeInUp space-y-8">
      {/* Intro: image paired with headline + tagline */}
      <div className="flex items-center gap-5 sm:gap-6">
        {bio.image && (
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
            <Image
              src={bio.image}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>
        )}

        <div className="min-w-0 space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.01em] leading-[1.15] text-zinc-900 dark:text-zinc-100 whitespace-pre-line">
            {bio.headline}
          </h1>
          {bio.subheadline && (
            <p className="text-sm md:text-base font-normal italic text-zinc-500 dark:text-zinc-400 whitespace-pre-line">
              {bio.subheadline}
            </p>
          )}
        </div>
      </div>

      {/* Bio text: separate, full-width */}
      <div
        className="space-y-8 text-base md:text-lg leading-[1.7] tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 [&>p]:leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: bio.content }}
      />
    </section>
  )
}
