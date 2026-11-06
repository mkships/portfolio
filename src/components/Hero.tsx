import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="portfolio-panel mt-6 rounded-[1.5rem] sm:mt-10 sm:rounded-[2rem] text-[#24251d] motion-safe:animate-fadeInUp md:mt-14 dark:text-[#fbf6ee]">
      <div className="grid items-center gap-5 sm:gap-7 md:grid-cols-[1.4fr_1fr] md:gap-9">
        <div>
          <div className="mb-4 flex sm:mb-5 items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
            <span className="h-2.5 w-2.5 rounded-full bg-moss dark:bg-tennis" aria-hidden="true" />
            Musings of a Product Guy
          </div>
          <h1 className="text-pretty text-[clamp(1.875rem,8.2vw,2.15rem)] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[2.65rem] md:text-[2.8rem]">
            {bio.headline}
          </h1>
          {bio.subheadline && (
            <p className="mt-4 text-sm font-semibold sm:text-base">{bio.subheadline}</p>
          )}
          <div
            className="mt-2 text-sm leading-relaxed text-[#514d40] sm:text-base dark:text-[#d7d2c1]"
            dangerouslySetInnerHTML={{ __html: bio.content }}
          />
          <a
            href="#work"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#24251d] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-moss dark:bg-tennis dark:text-zinc-950 dark:hover:bg-moss-light"
          >
            See selected work <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>

        {bio.image && (
          <div className="relative mx-auto aspect-[16/9] sm:aspect-[6/5] w-full max-w-sm overflow-hidden rounded-[1.35rem] bg-[#e8dfcd] ring-1 ring-black/10 md:aspect-[4/5] dark:ring-white/10">
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
