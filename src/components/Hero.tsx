import Image from 'next/image'
import { BioData } from '@/lib/types'
import PortraitCompare from './PortraitCompare'

const PORTRAIT_ALT = 'Manohar Kanapaka smiling at a table'
const PORTRAIT_SIZES = '(min-width: 768px) 260px, (min-width: 500px) 384px, calc(100vw - 74px)'
// Portraits are pre-cropped to 4:5; the wider mobile frames need to keep the face in view.
const PORTRAIT_POSITION = 'object-[center_20%] sm:object-[center_15%] md:object-center'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="portfolio-panel mt-6 sm:mt-10 text-[#24251d] motion-safe:animate-fadeInUp md:mt-14 dark:text-[#fbf6ee]">
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
            {bio.imageOriginal ? (
              <PortraitCompare
                after={bio.image}
                before={bio.imageOriginal}
                alt={PORTRAIT_ALT}
                sizes={PORTRAIT_SIZES}
                imageClassName={PORTRAIT_POSITION}
              />
            ) : (
              <Image
                src={bio.image}
                alt={PORTRAIT_ALT}
                fill
                className={`object-cover ${PORTRAIT_POSITION}`}
                sizes={PORTRAIT_SIZES}
                priority
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
