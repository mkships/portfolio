import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="py-4 animate-fadeInUp">
      <div className="space-y-4 text-base md:text-lg leading-normal text-zinc-500 dark:text-zinc-400 lowercase font-mono font-normal max-w-2xl">
        <p className="text-zinc-900 dark:text-zinc-100 font-medium font-sans text-lg md:text-xl">
          {bio.headline}
        </p>
        {bio.subheadline && <p>{bio.subheadline}</p>}
        <div
          className="space-y-4 [&>p]:leading-normal"
          dangerouslySetInnerHTML={{ __html: bio.content }}
        />
      </div>
    </section>
  )
}
