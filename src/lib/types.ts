export interface PostMeta {
  slug: string
  title: string
  date?: string
  tags: string[]
  excerpt?: string
  coverColor?: string
  tagline?: string
  status?: 'coming-soon' | 'beta' | 'live' | 'wip'
  archived?: boolean
  url?: string
  // Case study specific fields
  organization?: string
  year?: string
  role?: string
  metric?: string
  metricLabel?: string
  description?: string
  image?: string
  screenshots: Screenshot[]
}

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export interface PostDetail extends PostMeta {
  content: string
  highlights?: { value: string; label: string }[]
  linkPreviews: WebsitePreviewData[]
}

export interface WebsitePreviewData {
  url: string
  title: string
  image?: string
  description?: string
}

export interface BioData {
  headline: string
  subheadline: string
  content: string
  image?: string
  openTo?: string
}

export interface ExperienceData {
  roles: {
    period: string
    role: string
    organization?: string
    summary?: string
    href?: string
    links?: { label: string; href: string }[]
  }[]
  education: { period: string; degree: string; school: string }[]
  resumeUrl?: string
}
