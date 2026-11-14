import { getTinkerProjects } from '@/lib/posts'
import TinkerCard from '@/components/TinkerCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Tinkertank | MK',
  description: 'What I’m building with AI and agents, from web tools to a real kitchen.',
}

export default function ProductsPage() {
  const posts = getTinkerProjects()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14">
      <ScrollReveal>
        <div className="portfolio-panel">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] mb-3 text-zinc-900 dark:text-zinc-100">
            Tinkertank
          </h1>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {metadata.description}
          </p>
        </div>
      </ScrollReveal>

      <div className="border-t border-[var(--panel-border)]">
        {posts.map((post) => (
          <ScrollReveal key={post.slug}>
            <TinkerCard project={post} />
          </ScrollReveal>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-zinc-500 text-center py-12">
          No projects yet. Check back soon!
        </p>
      )}
    </div>
  )
}
