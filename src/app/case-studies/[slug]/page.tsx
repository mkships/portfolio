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
  const allSlugs = getAllSlugs('case-studies')

  // Find next case study (rotating: 1 → 2 → 3 → ... → 1)
  const currentIndex = allSlugs.indexOf(slug)
  const nextIndex = (currentIndex + 1) % allSlugs.length
  const nextSlug = allSlugs[nextIndex]

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24">
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
                  <span key={tag} className="text-xs uppercase tracking-[0.08em] text-zinc-500 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {(post.metric || post.metricLabel) && (
              <div className="p-6 border border-zinc-100 dark:border-zinc-800 border-dashed rounded-2xl bg-[#EFE9DD] dark:bg-zinc-900/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-4">key metric</span>
                <span className="text-3xl font-semibold text-moss">{post.metric || 'XX%'}</span>
                <p className="text-[10px] lowercase italic text-zinc-500 mt-2">{post.metricLabel || 'key metric description'}</p>
              </div>
            )}
          </aside>

          <main className="md:col-span-8">
            <div
              className="prose prose-zinc dark:prose-invert max-w-[65ch]
                prose-headings:lowercase prose-headings:font-semibold prose-headings:tracking-[-0.02em]
                prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-12
                prose-p:text-zinc-700 prose-p:dark:text-zinc-300 prose-p:leading-[1.75] prose-p:text-base
                prose-li:text-zinc-700 prose-li:dark:text-zinc-300 prose-li:leading-[1.75]
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
          <Link href={`/case-studies/${nextSlug}`} className="flex items-center gap-2 text-sm lowercase font-semibold text-moss hover:translate-x-1 transition-transform">
            next case study <ArrowRight size={14} />
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
