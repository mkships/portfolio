import { getAllPosts, getBio } from '@/lib/posts'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import TinkerCard from '@/components/TinkerCard'
import CompoundingLab from '@/components/CompoundingLab'
import TennisRally from '@/components/TennisRally'
import Footer from '@/components/Footer'

export default function Home() {
  const professionalWork = getAllPosts('case-studies')
  const tinkerTank = getAllPosts('products')
  const bio = getBio()

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-16">
      <Header />

      <Hero bio={bio} />

      <Section
        id="work"
        title="professional work"
        subtitle="case studies and highlights from my career in product management"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold lowercase text-zinc-900 dark:text-zinc-100">
              lost 25 kgs in 16 weeks. weight loss isn&apos;t hard!
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed lowercase">
              i followed three simple rules — be in a calorie deficit every single day, walk and move more (steps are underrated), and if possible, lift weights for gains and accelerated results. no fancy diets, no magic supplements. just consistency and the math of energy in vs energy out. the widget here lets you model that math yourself.
            </p>
          </div>
          <CompoundingLab />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
          <TennisRally />
          <div className="space-y-4 md:order-none order-first">
            <h3 className="text-lg md:text-xl font-semibold lowercase text-zinc-900 dark:text-zinc-100">
              tennis is my meditation.
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed lowercase">
              rhythm, focus, and staying in the point. the rally game here simulates that pressure — tap to keep the ball alive, but get the timing wrong and the point is over. it&apos;s a simple test of consistency under constraint, which is basically what tennis (and life) comes down to.
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
