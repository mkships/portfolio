'use client'

type Slide = {
  /** Path under /public, e.g. "/images/beyond/wimbledon.jpg". Leave undefined to show a placeholder tile. */
  image?: string
  sport: 'tennis' | 'pickleball'
  location: string
  caption?: string
  /** portrait cards are narrower, landscape wider — gives the strip a collage feel */
  orientation?: 'portrait' | 'landscape'
}

// Drop your photos into public/images/beyond/ and point `image` at them.
// Slides without an `image` render an on-brand placeholder so the strip
// always looks intentional.
const slides: Slide[] = [
  { sport: 'tennis', location: 'bengaluru, india', caption: 'clay court mornings', image: '/images/beyond/BLR.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'phuket, thailand', caption: 'chasing down a forehand', image: '/images/beyond/phuket2.jpeg', orientation: 'landscape' },
  { sport: 'tennis', location: 'hyderabad, india', caption: 'hometown hard courts', image: '/images/beyond/HYD.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'bangkok, thailand', caption: 'floodlit doubles with the crew', image: '/images/beyond/Bangkok2.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'phuket, thailand', caption: 'serving with a view', image: '/images/beyond/phuket4.jpeg', orientation: 'landscape' },
  { sport: 'pickleball', location: 'hyderabad, india', caption: 'match point energy', image: '/images/beyond/HYD2.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'bangkok, thailand', caption: 'rallies under the lights', image: '/images/beyond/Bangkok3.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'phuket, thailand', caption: 'the phuket crew', image: '/images/beyond/phuket5.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'bangkok, thailand', caption: 'late-night hits', image: '/images/beyond/Bangkok1.jpeg', orientation: 'portrait' },
  { sport: 'tennis', location: 'phuket, thailand', caption: 'island tennis', image: '/images/beyond/phuket3.jpeg', orientation: 'portrait' },
]

const gradients = [
  'from-moss/30 via-moss/10 to-transparent',
  'from-yellow-400/25 via-moss/10 to-transparent',
  'from-moss-light/30 via-moss/10 to-transparent',
  'from-lime-400/25 via-moss/10 to-transparent',
  'from-moss/25 via-yellow-400/10 to-transparent',
  'from-yellow-300/25 via-moss-light/10 to-transparent',
]

function Card({ slide, index }: { slide: Slide; index: number }) {
  const portrait = slide.orientation === 'portrait'
  return (
    <figure
      className={`group/card relative h-56 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10 ${
        portrait ? 'w-40' : 'w-72'
      }`}
    >
      {slide.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slide.image}
          alt={`${slide.sport} in ${slide.location}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
          <span className="text-5xl opacity-80">{slide.sport === 'pickleball' ? '🏓' : '🎾'}</span>
        </div>
      )}

      {/* Caption overlay */}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-3">
        <span className="mb-1 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-white/90 backdrop-blur">
          {slide.sport}
        </span>
        <p className="text-sm font-medium leading-tight text-white">
          {slide.location}
        </p>
        {slide.caption && (
          <p className="mt-0.5 text-[11px] italic leading-tight text-white/80">
            {slide.caption}
          </p>
        )}
      </figcaption>
    </figure>
  )
}

export default function TennisCarousel() {
  // Duplicate the set so the marquee can loop seamlessly (translateX -50%).
  const loop = [...slides, ...slides]

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em] mb-1">
          On Tour
        </h3>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic">
          tennis &amp; pickleball, one court at a time.
        </p>
      </div>

      {/* Auto-scrolling marquee — pauses on hover, edges fade out */}
      <div
        className="group relative -mx-6 overflow-hidden px-6
          [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        <div
          className="flex w-max gap-2 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ ['--marquee-duration' as string]: '40s' }}
        >
          {loop.map((slide, i) => (
            <Card key={i} slide={slide} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
