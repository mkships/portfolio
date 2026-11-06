'use client'

import { useState } from 'react'
import PreviewPicker from './PreviewPicker'

const steps = [
  {
    label: '1. Research',
    agent: 'Group recurring points of confusion in product docs and feedback, then point to the source for each theme.',
    judgment: 'Decide which issue is worth testing. For this example, focus on users who haven’t created their first report.',
    output: 'One testable hypothesis. A short prompt with a clear first step could help new users get to their first report.',
  },
  {
    label: '2. Draft',
    agent: 'Turn the brief into two short drafts using the same audience and goal. Flag any claims that need checking.',
    judgment: 'Choose the message that best matches what the product can actually do and make the next action specific.',
    output: 'A draft email with one action. “Start with a template, then customise your first report.”',
  },
  {
    label: '3. Review',
    agent: 'Check each draft against the brief, gather open questions, and prepare the measurement checklist.',
    judgment: 'Approve the copy and audience, then choose first reports created as the success measure.',
    output: 'A test brief with approved copy, audience, success measure, and a decision to make once results come in.',
  },
]

export default function StartdotdevPreview() {
  const [selected, setSelected] = useState(0)
  const step = steps[selected]

  return (
    <div className="space-y-4">
      <PreviewPicker label="Workflow stages" options={steps.map(item => item.label)} selected={selected} onSelect={setSelected} />
      <dl aria-live="polite" className="grid overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-border)] sm:grid-cols-2 sm:gap-px">
        <div className="bg-[var(--bg)] p-5">
          <dt className="portfolio-kicker">What the agent handles</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step.agent}</dd>
        </div>
        <div className="border-t border-[var(--panel-border)] bg-[var(--bg)] p-5 sm:border-t-0">
          <dt className="portfolio-kicker">What I decide</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step.judgment}</dd>
        </div>
        <div className="border-t border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:col-span-2 sm:border-t-0">
          <dt className="portfolio-kicker">What comes out</dt>
          <dd className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{step.output}</dd>
        </div>
      </dl>
    </div>
  )
}
