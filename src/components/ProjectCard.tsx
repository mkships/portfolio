import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface ProjectCardProps {
  project: PostMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/case-studies/${project.slug}`} className="group block">
      <article className="border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 flex items-center gap-5 hover:border-moss dark:hover:border-moss-light transition-colors">
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold leading-[1.3] lowercase text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          {(project.description || project.excerpt) && (
            <p className="mt-1.5 text-sm italic text-zinc-600 dark:text-zinc-400 leading-[1.5] lowercase">
              {project.description || project.excerpt}
            </p>
          )}
        </div>
        {(project.year || project.date) && (
          <span className="text-xs uppercase tracking-[0.15em] text-zinc-500 font-medium shrink-0">
            {project.year || project.date}
          </span>
        )}
      </article>
    </Link>
  )
}
