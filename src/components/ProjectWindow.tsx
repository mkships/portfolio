import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export const previewSlugs = ['court-trips', 'courtsidebio', 'la-cafe', 'startdotdev']

// Small, static views of the existing demos. Interactive controls live on the project page.
export default function ProjectWindow({ slug }: { slug: string }) {
  if (slug === 'la-cafe') return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#eee2d4]" aria-hidden="true">
      <Image src="/images/products/la-cafe/herbed-rice.webp" alt="" fill sizes="(min-width: 640px) 350px, calc(100vw - 34px)" className="object-cover object-center" />
      <div className="absolute left-4 top-4 rounded-lg bg-[#fffaf2] px-3 py-2">
        <Image src="/images/products/la-cafe/wordmark.webp" alt="" width={100} height={34} className="h-auto w-20" />
      </div>
      <span className="absolute bottom-3 right-3 rounded-full bg-[#fffaf2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#692a20]">From the menu</span>
    </div>
  )

  if (slug === 'court-trips') return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#24463d] text-[#faf5e9]" aria-hidden="true">
      <div className="absolute inset-0 flex items-center gap-4 p-4 sm:p-5">
      <svg viewBox="0 0 100 140" className="h-full min-h-0 w-[40%] shrink-0">
        <rect x="3" y="3" width="94" height="134" rx="4" fill="#355b50" />
        <g fill="none" stroke="#d9e7c3" strokeWidth="1.4">
          <rect x="13" y="13" width="74" height="114" />
          <path d="M22 13v114m56-114v114M22 42h56M22 98h56M50 42v56M9 70h82" />
        </g>
      </svg>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wider text-[#c6d8c9]">Directory preview</p>
        <p className="mt-2 font-display text-lg font-semibold leading-tight">A weekend on court.</p>
        <p className="mt-2 text-xs text-[#dce7db]">Tennis &amp; padel<br />Brighton, UK</p>
      </div>
      </div>
    </div>
  )

  if (slug === 'courtsidebio') return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#e3eae1]" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center px-4 py-3">
      <div className="w-full max-w-60 rounded-xl border border-[#c9d4c8] bg-[#fbfcf8] p-2.5 text-[#233c36] shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#233c36] font-display text-sm text-white">AM</span>
          <div>
            <p className="font-display text-base font-semibold">Alex Morgan</p>
            <p className="text-[10px] text-[#526757]">Sample coach profile</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-md bg-[#edf2e8] px-3 py-1.5 text-xs font-medium">
          Coaching <span>$65 / session</span>
        </div>
        <div className="mt-1.5 rounded-md border border-[#d8e0d3] px-3 py-1.5 text-xs">Hitting practice</div>
      </div>
      </div>
    </div>
  )

  if (slug === 'startdotdev') return (
    <div className="flex aspect-[16/9] flex-col justify-center bg-[#edf0e4] p-5 text-[#293820]" aria-hidden="true">
      <div className="mb-4 flex items-center gap-2">
        <Image src="/images/products/startdotdev.png" alt="" width={24} height={24} className="h-6 w-6" />
        <p className="text-[10px] font-semibold uppercase tracking-wider">Workflow preview</p>
      </div>
      <div className="flex items-center gap-1.5">
        {['Research', 'Draft', 'Review'].map((stage, index) => (
          <div key={stage} className="contents">
            {index > 0 && <ArrowRight size={12} className="shrink-0" />}
            <span className="flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-lg border border-[#cbd4bb] bg-[#fbfcf5] px-1 text-[11px] font-medium">{stage}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[#536044]">Agents assist. Human judgment directs.</p>
    </div>
  )

  return null
}
