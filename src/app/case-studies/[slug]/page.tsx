import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('case-studies')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('case-studies', slug)

  if (!post) {
    return { title: 'Not Found' }
  }

  return {
    title: `${post.title} | Case Studies`,
    description: post.excerpt,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('case-studies', slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24">
      {/* Detail Header */}
      <header className="flex items-center justify-between">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-sm font-medium lowercase hover:text-moss transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          back to work
        </Link>

        <ThemeToggle />
      </header>

      <article className="animate-fadeInUp">
        {/* Hero Content */}
        <div className="space-y-8 mb-20">
          <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold lowercase text-zinc-900 dark:text-zinc-100">
                {post.title}
              </h1>
              <p className="text-moss dark:text-moss-light lowercase italic text-lg">
                {post.description || post.excerpt}
              </p>
            </div>
            <div className="text-right hidden md:block">
              <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-1">delivery year</span>
              <span className="text-xl font-medium font-mono text-zinc-900 dark:text-zinc-100">{post.year || post.date}</span>
            </div>
          </div>

        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <aside className="md:col-span-4 space-y-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-4">my role</span>
              <p className="text-sm font-medium lowercase">{post.role || 'your role'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-4">the stack</span>
              <div className="flex flex-col gap-2">
                {post.tags?.map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {(post.metric || post.metricLabel) && (
              <div className="p-6 border border-zinc-100 dark:border-zinc-800 border-dashed rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-4">key metric</span>
                <span className="text-3xl font-semibold text-moss">{post.metric || 'XX%'}</span>
                <p className="text-[10px] lowercase italic text-zinc-500 mt-2">{post.metricLabel || 'key metric description'}</p>
              </div>
            )}
          </aside>

          <main className="md:col-span-8">
            <div
              className="prose prose-zinc dark:prose-invert prose-lg max-w-none
                prose-headings:lowercase prose-headings:font-semibold
                prose-h2:text-lg prose-h2:mb-4
                prose-p:text-zinc-600 prose-p:dark:text-zinc-400 prose-p:leading-relaxed
                prose-a:text-moss prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </main>
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-12 flex justify-between items-center">
          <Link href="/#work" className="text-sm lowercase text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← back to all work
          </Link>
          <button className="flex items-center gap-2 text-sm lowercase font-semibold text-moss hover:translate-x-1 transition-transform">
            next case study <ArrowRight size={14} />
          </button>
        </div>
      </article>

      <Footer />
    </div>
  )
}
