import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { getAllPosts, getBio, getExperience, getTinkerProjects } from '@/lib/posts'
import { getMusingEssays, getMusings } from '@/lib/musings'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import TinkerCard from '@/components/TinkerCard'
import CompoundingLabWidget from '@/components/CompoundingLabWidget'
import CourtNotes from '@/components/CourtNotes'
import CareerTimeline from '@/components/CareerTimeline'
import MusingsList from '@/components/MusingsList'
import WebsitePreview from '@/components/WebsitePreview'

const alcarazPreview = {
  url: 'https://www.atptour.com/en/players/carlos-alcaraz/a0e2/overview',
  title: 'Carlos Alcaraz · ATP Tour',
  description: 'Player profile, rankings, match results and career stats.',
}

export default function Home() {
  const professionalWork = getAllPosts('case-studies').sort((a, b) =>
    (b.year || '').localeCompare(a.year || '')
  )
  const featuredStudy = professionalWork.find(project => project.slug === 'retail-bharat')
  const tinkerTank = getTinkerProjects()
  const recentMusings = getMusingEssays().slice(0, 3)
  const otherMusings = getMusings().length - recentMusings.length
  const bio = getBio()
  const experience = getExperience()

  return (
    <div className="relative mx-auto flex max-w-3xl flex-col px-4 sm:px-6">
      <Hero bio={bio} />

      <Section
        id="work"
        title="Professional work"
        subtitle="Case studies and highlights from my career in product management."
      >
        {featuredStudy && (
          <article className="mb-2 grid gap-6 rounded-[1.5rem] border border-[#dedfc9] bg-[#f4f4e7] p-6 sm:p-8 md:grid-cols-[1.25fr_1fr] md:items-center dark:border-[#35382a] dark:bg-[#1d2118]">
            <div>
              <p className="portfolio-meta">
                {[featuredStudy.organization, featuredStudy.year, 'Featured'].filter(Boolean).join(' · ')}
              </p>
              <h3 className="mt-3 text-pretty font-display text-2xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
                How do you run 150+ supermarkets when the tools are spreadsheets?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                We built one merchant platform for inventory, procurement, and financials. Configurable rules helped it adapt across stores.
              </p>
              <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
                <strong className="mr-1 text-xl font-semibold text-moss-dark dark:text-moss-light">83.3%</strong> monthly retention for new merchants
              </p>
              <Link
                href={`/case-studies/${featuredStudy.slug}`}
                className="group mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current dark:text-moss-light"
              >
                Read the case study <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <figure className="rounded-xl border border-[#dedfc9] bg-[#fcfcf5] p-4 dark:border-[#3c402f] dark:bg-[#171a13]">
              <figcaption className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
                How store rules worked
              </figcaption>
              <ol className="space-y-1.5 text-center text-sm">
                <li className="rounded-lg border border-[#dedfc9] px-3 py-2 dark:border-[#3c402f]">10K+ products across 150+ stores</li>
                <li>
                  <ArrowDown className="mx-auto mb-1.5 text-moss dark:text-moss-light" size={14} aria-hidden="true" />
                  <div className="rounded-lg bg-[#e7edc7] px-3 py-2 font-semibold text-[#313c16] dark:bg-[#343f21] dark:text-[#e1edb8]">
                    Configurable rules engine
                  </div>
                </li>
                <li>
                  <ArrowDown className="mx-auto mb-1.5 text-moss dark:text-moss-light" size={14} aria-hidden="true" />
                  <div className="rounded-lg border border-[#dedfc9] px-3 py-2 dark:border-[#3c402f]">Catalogue, returns, and replenishment</div>
                </li>
              </ol>
            </figure>
          </article>
        )}
        <div className="flex flex-col">
          {professionalWork.filter(project => project !== featuredStudy).map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <CareerTimeline experience={experience} />
      </Section>

      {recentMusings.length > 0 && (
        <Section id="musings" title="Musings" subtitle="Notes on products, building with AI, and life on and off court.">
          <MusingsList entries={recentMusings} />
          <Link href="/musings" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light">
            {otherMusings > 0 ? `${otherMusings} more posts on tech, tennis and fitness` : 'All musings'} <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Section>
      )}

      <Section
        id="tinkertank"
        title="Tinkertank"
        subtitle="What I’m building with AI and agents, from web tools to a real kitchen."
      >
        <div className="border-t border-[var(--panel-border)]">
          {tinkerTank.map(project => (
            <TinkerCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="beyondwork"
        title="Beyond work"
        subtitle="How I got fit and why I keep coming back to tennis."
      >
        <div className="divide-y divide-[var(--panel-border)] border-t border-[var(--panel-border)]">
          <article className="flex flex-col gap-3 py-6 sm:py-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              How I got fit
            </h3>
            <p className="text-base leading-[1.75] text-zinc-700 dark:text-zinc-300">
              I was 97 kg in mid-2021. I got serious at the end of 2022, and by mid-2023 I was down to 73 kg. I did it by maintaining a calorie deficit, moving more, and showing up every day.
              The math made it click for me. A deficit of roughly 7,700 kcal is a rule of thumb for losing 1 kg of fat.
              The calculator starts at my 97 kg and shows how those daily deficits add up.
            </p>
            <p className="portfolio-meta">
              97 kg → 73 kg ·{' '}
              <a href="https://x.com/mkanapaka/status/1740800474700517576" target="_blank" rel="noopener noreferrer" className="underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                the post I wrote when I got there
              </a>
            </p>
            <CompoundingLabWidget />
          </article>

          <article className="flex flex-col gap-3 pt-6 sm:pt-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Tennis is my reset button
            </h3>
            <WebsitePreview previews={[alcarazPreview]}>
              <p className="text-base leading-[1.75] text-zinc-700 dark:text-zinc-300">
                I’m a little obsessed with tennis. I play recreationally, and if there’s a match on TV I’m probably watching it live. Time on court is the thing that most reliably slows my head down.{' '}
                <a href={alcarazPreview.url} className="font-medium text-moss-dark underline underline-offset-4 dark:text-moss-light">Carlos Alcaraz</a> is my favourite player right now.
              </p>
            </WebsitePreview>
            <CourtNotes />
          </article>
        </div>
      </Section>
    </div>
  )
}
