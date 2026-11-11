import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Layers3, MapPin, PanelsTopLeft } from 'lucide-react'
import { statusLabels } from '@/lib/posts'
import { PostMeta } from '@/lib/types'
import ProjectWindow, { previewSlugs } from './ProjectWindow'

const projectIcons: Record<string, typeof MapPin> = {
  'court-trips': MapPin,
  courtsidebio: PanelsTopLeft,
}

export default function TinkerCard({ project }: { project: PostMeta }) {
  const Icon = projectIcons[project.slug] || Layers3
  const hasPreview = previewSlugs.includes(project.slug)

  return (
    <article className="portfolio-card flex h-full flex-col overflow-hidden p-0 sm:p-0">
      <Link href={`/products/${project.slug}`} className="group flex flex-1 flex-col focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-moss">
        <ProjectWindow slug={project.slug} />
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            {project.image ? (
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src={project.image.startsWith('/') ? project.image : `/${project.image}`}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--card-mark)] text-moss-dark dark:text-moss-light">
                <Icon size={19} aria-hidden="true" />
              </div>
            )}
            <span className="portfolio-meta rounded-full border border-[var(--panel-border)] px-2.5 py-1.5">
              {project.role || statusLabels[project.status ?? 'wip']}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.description || project.tagline}
            </p>
          </div>

        </div>
      </Link>
      <div className="mx-4 flex flex-wrap items-center justify-between gap-x-3 border-t border-[var(--panel-border)] py-2 sm:mx-5">
        <span className="font-mono text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">{project.tags.join(' · ')}</span>
        <Link href={`/products/${project.slug}${hasPreview ? '#project-preview' : ''}`} aria-label={`${hasPreview ? 'Explore preview' : 'Read more'}: ${project.title}`} className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-moss-dark underline decoration-moss/30 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss dark:text-moss-light">
          {hasPreview ? 'Explore preview' : 'Read more'} <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
