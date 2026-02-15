import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Professional Work | MK',
  description: 'Case studies and highlights from my career.',
}

export default function CaseStudiesPage() {
  const posts = getAllPosts('case-studies')

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-16">
      <header className="flex items-center justify-between">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm font-medium lowercase hover:text-moss transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          back to home
        </Link>
        <ThemeToggle />
      </header>

      <ScrollReveal>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold lowercase mb-2 text-zinc-900 dark:text-zinc-100">
            professional work
          </h1>
          <p className="text-moss dark:text-moss-light lowercase text-sm italic">
            case studies and highlights from my career in product management
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

      <Footer />
    </div>
  )
}
