import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { PostMeta, PostDetail, BioData } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

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
        url: data.url,
        year: data.year,
        role: data.role,
        metric: data.metric,
        metricLabel: data.metricLabel,
        description: data.description,
        image: data.image,
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
    url: data.url,
    year: data.year,
    role: data.role,
    metric: data.metric,
    metricLabel: data.metricLabel,
    description: data.description,
    image: data.image,
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
