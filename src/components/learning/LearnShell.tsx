import type { TrackTheme } from '@/lib/learning-plan'

// Wraps a page of the learning space and sets its look. The hub uses 'paper', a neutral
// take on the main site's warm tones; each track brings its own.
export default function LearnShell({
  theme,
  children,
}: {
  theme: TrackTheme | 'paper'
  children: React.ReactNode
}) {
  return (
    <div className="learn" data-theme={theme}>
      <div className="lp-page">{children}</div>
    </div>
  )
}
