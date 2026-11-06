interface Props {
  label: string
  options: readonly string[]
  selected: number
  onSelect: (index: number) => void
}

export default function PreviewPicker({ label, options, selected, onSelect }: Props) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected === index}
          onClick={() => onSelect(index)}
          className="min-h-11 rounded-full border border-[var(--panel-border)] px-3.5 py-2 text-xs font-semibold transition-colors hover:border-moss aria-pressed:border-moss-dark aria-pressed:bg-[var(--card-mark)] dark:aria-pressed:border-moss-light"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
