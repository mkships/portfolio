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
}
