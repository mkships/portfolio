import { getAllPosts, getBio } from '@/lib/posts'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import TinkerCard from '@/components/TinkerCard'
import WeightWidget from '@/components/WeightWidget'
import TennisWidget from '@/components/TennisWidget'
import Footer from '@/components/Footer'

export default function Home() {
  const professionalWork = getAllPosts('case-studies')
  const tinkerTank = getAllPosts('products')
  const bio = getBio()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <WeightWidget />
          <TennisWidget />
        </div>
      </Section>

      <Footer />
    </div>
  )
}
