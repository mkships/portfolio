import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PostMeta } from '@/lib/types'

interface ProjectCardProps {
  project: PostMeta
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/case-studies/${project.slug}`} className="group block">
      <article className="border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 flex flex-col gap-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 h-full">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold lowercase text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
            {project.year || project.date}
          </span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal min-h-[50px]">
          {project.description || project.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex gap-3 flex-wrap">
            {project.tags?.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-500 font-mono font-medium">
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
