import { getAllPosts, getBio, statusOrder } from '@/lib/posts'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import TinkerCard from '@/components/TinkerCard'
import CompoundingLab from '@/components/CompoundingLab'
import TennisRally from '@/components/TennisRally'
import Footer from '@/components/Footer'

export default function Home() {
  const professionalWork = getAllPosts('case-studies').sort((a, b) =>
    (b.year || '').localeCompare(a.year || '')
  )
  const tinkerTank = getAllPosts('products').sort(
    (a, b) => (statusOrder[a.status ?? 'wip'] ?? 99) - (statusOrder[b.status ?? 'wip'] ?? 99)
  )
  const bio = getBio()

  return (
    <div className="relative max-w-2xl mx-auto px-6 py-12 md:py-24 flex flex-col">
      <Header />

      <Hero bio={bio} />

      <Section
        id="work"
        title="professional work"
        subtitle="case studies and highlights from my career in product management"
      >
        <div className="flex flex-col gap-3">
          {professionalWork.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="tinkertank"
        title="ai/vibe coding"
        subtitle="tinkering with ai and agents to create some cool and fun products/projects"
      >
        <div className="flex flex-col gap-3">
          {tinkerTank.map(project => (
            <TinkerCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="beyondwork"
        title="beyond work"
        subtitle="detailing my journey with fitness and tennis"
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-xl md:text-[22px] font-semibold tracking-[-0.02em] leading-[1.25] lowercase text-zinc-900 dark:text-zinc-100">
            lost 25 kg in 16 weeks 🏋️‍♂️🔥
          </h3>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-[1.75] lowercase">
            no diets, no supplements — just a daily calorie deficit, more steps, and consistency. model the math yourself below.
          </p>
          <CompoundingLab />
        </div>

        <div className="flex flex-col gap-4 mt-16">
          <h3 className="text-xl md:text-[22px] font-semibold tracking-[-0.02em] leading-[1.25] lowercase text-zinc-900 dark:text-zinc-100">
            tennis is my meditation 🎾🧘
          </h3>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-[1.75] lowercase">
            rhythm, focus, and staying in the point. tap to rally below — mistime it and the point&apos;s over.
          </p>
          <TennisRally />
        </div>
      </Section>

      <Footer />
    </div>
  )
}
