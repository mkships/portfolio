import { getAllPosts } from '@/lib/posts'
import WorkCard from '@/components/WorkCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'Professional Work | Portfolio',
  description: 'Case studies and highlights from my career.',
}

export default function CaseStudiesPage() {
  const posts = getAllPosts('case-studies')

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <header className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Professional Work
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Case studies and highlights from my career in product management
            </p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} className={`stagger-${(index % 3) + 1}`}>
              <WorkCard post={post} />
            </ScrollReveal>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-text-secondary text-center py-12">
            No case studies yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
