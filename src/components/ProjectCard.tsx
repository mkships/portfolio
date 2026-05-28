import Link from 'next/link'
import { PostMeta } from '@/lib/types'

interface ProjectCardProps {
  project: PostMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/case-studies/${project.slug}`} className="group block h-full">
      <article className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col h-full gap-4 hover:border-moss dark:hover:border-moss-light transition-colors">
        <h3 className="text-lg font-semibold leading-[1.3] lowercase text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-[1.6] lowercase">
          {project.description || project.excerpt}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-auto pt-1">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs text-zinc-500 lowercase">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
