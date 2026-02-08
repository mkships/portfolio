import { BioData } from '@/lib/types'

interface HeroProps {
  bio: BioData
}

export default function Hero({ bio }: HeroProps) {
  return (
    <section className="py-4 animate-fadeInUp">
      <div className="space-y-5 text-lg md:text-xl leading-relaxed text-zinc-500 dark:text-zinc-400 lowercase font-mono font-normal max-w-2xl">
        <p className="text-zinc-900 dark:text-zinc-100 font-medium font-sans">
          {bio.headline}
        </p>
        <p>{bio.subheadline}</p>
        <div
          className="prose prose-zinc dark:prose-invert prose-p:text-zinc-500 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:lowercase prose-p:font-mono prose-p:text-lg md:prose-p:text-xl prose-p:my-4 max-w-none [&>p:first-child]:mt-0"
          dangerouslySetInnerHTML={{ __html: bio.content }}
        />
      </div>
    </section>
  )
}
