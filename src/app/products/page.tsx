import { getAllPosts } from '@/lib/posts'
import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'AI/Vibe Coding | Portfolio',
  description: 'Experimental projects and AI explorations.',
}

export default function ProductsPage() {
  const posts = getAllPosts('products')

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <header className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
              AI/Vibe Coding
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Tinkering with AI and Agents to create some cool and fun products/projects
            </p>
          </header>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} className={`stagger-${(index % 3) + 1}`}>
              <ProjectCard project={post} />
            </ScrollReveal>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-text-secondary text-center py-12">
            No projects yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
