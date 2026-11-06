import { getAllPosts } from '@/lib/posts'
import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Professional Work | MK',
  description: 'Case studies and highlights from my career.',
}

export default function CaseStudiesPage() {
  const posts = getAllPosts('case-studies').sort((a, b) =>
    (b.year || '').localeCompare(a.year || '')
  )

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 pt-6 sm:px-6 sm:pt-10 md:pt-14">
      <ScrollReveal>
        <div className="portfolio-panel">
          <p className="portfolio-kicker mb-3">Case studies</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] mb-3 text-zinc-900 dark:text-zinc-100">
            professional work
          </h1>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            case studies and highlights from my career in product management
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <ScrollReveal key={post.slug}>
            <ProjectCard project={post} />
          </ScrollReveal>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-zinc-500 text-center py-12">
          No case studies yet. Check back soon!
        </p>
      )}
    </div>
  )
}
