import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('products')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('products', slug)

  if (!post) {
    return { title: 'Not Found' }
  }

  return {
    title: `${post.title} | AI/Vibe Coding`,
    description: post.tagline,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('products', slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24">
      {/* Detail Header */}
      <header className="flex items-center justify-between">
        <Link
          href="/#tinkertank"
          className="flex items-center gap-2 text-sm font-medium lowercase hover:text-moss transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          back to tinkertank
        </Link>

        <ThemeToggle />
      </header>

      <article className="animate-fadeInUp">
        {/* Hero Content */}
        <div className="space-y-8 mb-20">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <h1 className="text-4xl font-semibold lowercase text-zinc-900 dark:text-zinc-100 mb-2">
              {post.title}
            </h1>
            <p className="text-moss dark:text-moss-light lowercase italic text-lg">
              {post.tagline}
            </p>

            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-moss text-white font-medium rounded-full hover:bg-moss-dark transition-colors lowercase text-sm"
              >
                visit project <ExternalLink size={14} />
              </a>
            )}
          </div>

        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <aside className="md:col-span-4 space-y-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-4">status</span>
              <p className="text-sm font-medium lowercase">{post.status || 'in development'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-4">tech stack</span>
              <div className="flex flex-col gap-2">
                {post.tags?.map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <main className="md:col-span-8">
            <div
              className="prose prose-zinc dark:prose-invert prose-lg max-w-none
                prose-headings:lowercase prose-headings:font-semibold
                prose-h2:text-lg prose-h2:mb-4
                prose-p:text-zinc-600 prose-p:dark:text-zinc-400 prose-p:leading-relaxed
                prose-a:text-moss prose-a:no-underline hover:prose-a:underline
                prose-ul:text-zinc-600 prose-ul:dark:text-zinc-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </main>
        </div>

        {/* Back link */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-12">
          <Link href="/#tinkertank" className="text-sm lowercase text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← back to tinkertank
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}
