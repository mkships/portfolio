import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PostMeta } from '@/lib/types'

interface ProjectCardProps {
  project: PostMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/case-studies/${project.slug}`} className="group block h-full">
      <article className="border border-zinc-100 dark:border-zinc-800 rounded-2xl p-7 flex flex-col h-full hover:border-moss dark:hover:border-moss-light transition-all hover:bg-moss/5 dark:hover:bg-moss/10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl md:text-[22px] font-semibold tracking-[-0.02em] leading-[1.25] lowercase text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] shrink-0 ml-3 mt-1">
            {project.year || project.date}
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-[1.75] mb-6">
          {project.description || project.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex gap-3 flex-wrap">
            {project.tags?.map(tag => (
              <span key={tag} className="text-xs uppercase tracking-[0.08em] text-zinc-500 font-medium">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-moss dark:text-moss-light opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </article>
    </Link>
  )
}
