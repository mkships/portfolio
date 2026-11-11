import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { getAllPosts, getBio, getTinkerProjects } from '@/lib/posts'
import { getMusings } from '@/lib/musings'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import TinkerCard from '@/components/TinkerCard'
import CompoundingLabWidget from '@/components/CompoundingLabWidget'
import CourtNotes from '@/components/CourtNotes'
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
  const recentMusings = getMusings().slice(0, 3)
  const bio = getBio()

  return (
    <div className="relative mx-auto flex max-w-3xl flex-col px-4 sm:px-6">
      <Hero bio={bio} />

      <Section
        id="work"
        title="professional work"
        subtitle="case studies and highlights from my career in product management"
      >
        {featuredStudy && (
          <article className="mb-5 grid gap-6 rounded-[1.5rem] border border-[#dedfc9] bg-[#f4f4e7] p-6 sm:p-8 md:grid-cols-[1.25fr_1fr] md:items-center dark:border-[#35382a] dark:bg-[#1d2118]">
            <div>
              <p className="portfolio-kicker">
                Featured case study · SuperK
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
                Read the case study <ArrowUpRight size={15} aria-hidden="true" />
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
        <div className="flex flex-col gap-3">
          {professionalWork.filter(project => project !== featuredStudy).map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      {recentMusings.length > 0 && (
        <Section id="musings" title="Musings" subtitle="Notes on products, building with AI, and life on and off court.">
          <MusingsList entries={recentMusings} />
          <Link href="/musings" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-moss-dark underline decoration-moss/40 underline-offset-4 hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-moss-light">
            All musings <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </Section>
      )}

      <Section
        id="tinkertank"
        title="tinkertank"
        subtitle="What I’m building with AI and agents, from web tools to a real kitchen."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {tinkerTank.map(project => (
            <TinkerCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="beyondwork"
        title="beyond work"
        subtitle="How I got fit and why I keep coming back to tennis."
      >
        <div className="portfolio-panel divide-y divide-[var(--panel-border)]">
          <article className="flex flex-col gap-3 pb-6 sm:pb-8">
            <p className="portfolio-kicker">Fitness</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              How I got fit
            </h3>
            <p className="text-base leading-[1.75] text-zinc-700 dark:text-zinc-300">
              During the summer of 2023, I lost around 25 kg with calorie deficit, more daily movement, and showing up every single day. To lose 1 kg of fat, you need to create a calorie deficit of 7700 kcal. Once you realise that it is entirely just math, you can start to see the power of compounding.
              Use this simple widget to understand how you can transform your body with a consistent calorie deficit and more daily movement.
            </p>
            <CompoundingLabWidget />
          </article>

          <article className="flex flex-col gap-3 pt-6 sm:pt-8">
            <p className="portfolio-kicker">Tennis</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Tennis is my reset button
            </h3>
            <WebsitePreview previews={[alcarazPreview]}>
              <p className="text-base leading-[1.75] text-zinc-700 dark:text-zinc-300">
                Over the years, tennis has become more than a sport for me. It’s almost an obsession. I play it recreationally and watch it live on TV whenever I can. The rhythm, intensity and beauty of the game help me slow down and clear my head.{' '}
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
