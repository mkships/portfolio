export interface PostMeta {
  slug: string
  title: string
  date?: string
  tags: string[]
  excerpt?: string
  coverColor?: string
  tagline?: string
  status?: 'coming-soon' | 'beta' | 'live'
  url?: string
  // Case study specific fields
  year?: string
  role?: string
  metric?: string
  metricLabel?: string
  description?: string
  image?: string
}

export interface PostDetail extends PostMeta {
  content: string
}

export interface BioData {
  headline: string
  subheadline: string
  content: string
}
