import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LearnHeader from '@/components/learning/LearnHeader'
import LearnShell from '@/components/learning/LearnShell'
import LearningPath from '@/components/learning/LearningPath'
import { getLearningHub, getTrack } from '@/lib/learning'
import { allLessons } from '@/lib/learning-plan'

interface Props {
  params: Promise<{ track: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getLearningHub().tracks.map(track => ({ track: track.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track: id } = await params
  const track = getTrack(id)
  if (!track) return { title: 'Not found' }

  return {
    title: track.title,
    description: track.intro,
    alternates: { canonical: `https://learn.mkanapaka.space/${track.id}` },
  }
}

export default async function TrackPage({ params }: Props) {
  const { track: id } = await params
  const track = getTrack(id)
  if (!track) notFound()

  const phases = track.phases.filter(phase => !phase.optional)
  const lessons = allLessons(track).filter(lesson => !lesson.optional)

  return (
    <LearnShell theme={track.theme}>
      <LearnHeader current={track.title} />

      <div className="lp-mast">
        <p className="lp-kicker">
          {phases.length} phases · {lessons.length} lessons
        </p>
        <h1>{track.title}</h1>
        <p>{track.intro}</p>
      </div>

      <LearningPath track={track} />
    </LearnShell>
  )
}
