import { getAllPosts, getBio, statusOrder } from '@/lib/posts'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import TinkerCard from '@/components/TinkerCard'
import CompoundingLabWidget from '@/components/CompoundingLabWidget'
import TennisCarousel from '@/components/TennisCarousel'
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
    <div className="relative max-w-2xl mx-auto px-6 pt-6 md:pt-10 pb-12 md:pb-24 flex flex-col">
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
          <h3 className="text-lg md:text-xl font-semibold tracking-[-0.02em] leading-[1.25] text-zinc-900 dark:text-zinc-100">
            Lost fat and got fit 🏋️‍♂️🔥
          </h3>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-[1.75]">
            During the summer of 2023, I lost around 25 kg with calorie deficit, more daily movement, and showing up every single day. To lose 1 kg of fat, you need to create a calorie deficit of 7700 kcal. Once you realise that it is entirely just math, you can start to see the power of compounding.
            Use this simple widget to understand how you can transform your body with a consistent calorie deficit and more daily movement.
          </p>
          <CompoundingLabWidget />
        </div>

        <div className="flex flex-col gap-4 mt-16">
          <h3 className="text-lg md:text-xl font-semibold tracking-[-0.02em] leading-[1.25] text-zinc-900 dark:text-zinc-100">
            Tennis is my reset button 🎾🧘
          </h3>
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-[1.75]">
            Over the years, tennis has become more than a sport for me — it’s my reset button. I play it recreationally, watch it on TV obsessively, and somehow the rhythm, intensity, and beauty of the game always helps me slow down and relax. Currently, my favorite player is Carlos Alcaraz.
          </p>
          <TennisCarousel />
        </div>
      </Section>

      <Footer />
    </div>
  )
}
