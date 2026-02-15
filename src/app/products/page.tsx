import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import TinkerCard from '@/components/TinkerCard'
import ScrollReveal from '@/components/ScrollReveal'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'AI/Vibe Coding | MK',
  description: 'Experimental projects and AI explorations.',
}

export default function ProductsPage() {
  const posts = getAllPosts('products')

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-16">
      <header className="flex items-center justify-between">
        <Link
          href="/#tinkertank"
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
            ai/vibe coding
          </h1>
          <p className="text-moss dark:text-moss-light lowercase text-sm italic">
            tinkering with ai and agents to create some cool and fun products/projects
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      <Footer />
    </div>
  )
}
