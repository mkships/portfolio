import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { PostMeta, PostDetail, BioData, ExperienceData } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

const statusOrder: Record<string, number> = {
  live: 0,
  beta: 1,
  wip: 2,
  'coming-soon': 3,
}

export const statusLabels = {
  live: 'Live',
  beta: 'Beta',
  wip: 'In progress',
  'coming-soon': 'Coming soon',
}

export function getTinkerProjects(): PostMeta[] {
  return getAllPosts('products')
    .filter(post => !post.archived)
    .sort((a, b) => (statusOrder[a.status ?? 'wip'] ?? 99) - (statusOrder[b.status ?? 'wip'] ?? 99))
}

export function getAllPosts(dir: string): PostMeta[] {
  const fullPath = path.join(contentDirectory, dir)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const fileNames = fs.readdirSync(fullPath)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const filePath = path.join(fullPath, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date,
        tags: data.tags || [],
        excerpt: data.excerpt,
        coverColor: data.coverColor,
        tagline: data.tagline,
        status: data.status,
        archived: data.archived === true,
        url: data.url,
        organization: data.organization,
        year: data.year,
        role: data.role,
        metric: data.metric,
        metricLabel: data.metricLabel,
        description: data.description,
        image: data.image,
        screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
      } as PostMeta
    })

  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0
    return b.date.localeCompare(a.date)
  })
}

export function getPostBySlug(dir: string, slug: string): PostDetail | null {
  const fullPath = path.join(contentDirectory, dir, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = marked(content) as string

  return {
    slug,
    title: data.title || slug,
    date: data.date,
    tags: data.tags || [],
    excerpt: data.excerpt,
    coverColor: data.coverColor,
    tagline: data.tagline,
    status: data.status,
    archived: data.archived === true,
    url: data.url,
    organization: data.organization,
    year: data.year,
    role: data.role,
    metric: data.metric,
    metricLabel: data.metricLabel,
    description: data.description,
    image: data.image,
    screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
    highlights: data.highlights,
    linkPreviews: data.linkPreviews ?? (data.linkPreview ? [data.linkPreview] : []),
    content: htmlContent,
  }
}

export function getBio(): BioData {
  const fullPath = path.join(contentDirectory, 'bio.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = marked(content) as string

  return {
    headline: data.headline || '',
    subheadline: data.subheadline || '',
    content: htmlContent,
    image: data.image,
    openTo: data.openTo,
  }
}

export function getExperience(): ExperienceData {
  const fullPath = path.join(contentDirectory, 'experience.md')
  const data = fs.existsSync(fullPath) ? matter(fs.readFileSync(fullPath, 'utf8')).data : {}
  const hasResume = fs.existsSync(path.join(process.cwd(), 'public', 'resume.pdf'))

  return {
    roles: Array.isArray(data.roles) ? data.roles : [],
    education: Array.isArray(data.education) ? data.education : [],
    resumeUrl: hasResume ? '/resume.pdf' : undefined,
  }
}

export function getAllSlugs(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const fileNames = fs.readdirSync(fullPath)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
