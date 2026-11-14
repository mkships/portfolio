import Image from 'next/image'
import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="portfolio-panel mt-6 rounded-[1.5rem] sm:mt-10 sm:rounded-[2rem] text-[#24251d] motion-safe:animate-fadeInUp md:mt-14 dark:text-[#fbf6ee]">
      <div className="grid items-center gap-5 sm:gap-7 md:grid-cols-[1.4fr_1fr] md:gap-9">
        <div>
          <h1 className="text-pretty text-[clamp(1.875rem,8.2vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[2.65rem] md:text-[2.8rem]">
            {bio.headline}
          </h1>
          {bio.subheadline && (
            <p className="mt-4 text-sm font-semibold sm:text-base">{bio.subheadline}</p>
          )}
          <div
            className="mt-2 text-sm leading-relaxed text-[#514d40] sm:text-base dark:text-[#d7d2c1]"
            dangerouslySetInnerHTML={{ __html: bio.content }}
          />
        </div>

        {bio.image && (
          <div className="relative mx-auto aspect-[16/9] w-full max-w-sm overflow-hidden rounded-[1.35rem] bg-[#e8dfcd] ring-1 ring-black/10 sm:aspect-[6/5] md:aspect-[4/5] dark:ring-white/10">
            <Image
              src={bio.image}
              alt="Manohar Kanapaka smiling at a table"
              fill
              className="object-cover object-top sm:object-[center_42%]"
              sizes="(min-width: 768px) 260px, (min-width: 500px) 384px, calc(100vw - 74px)"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
