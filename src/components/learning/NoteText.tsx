import type { ReactNode } from 'react'

const linkPattern = /(https:\/\/[^\s<>()`]+[^\s<>()`.,;:!?'"])/

// Renders note text without ever touching innerHTML: line breaks are kept, `code` and fenced
// blocks become code elements, and https:// addresses become links.
function inline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(`[^`\n]+`)/).flatMap((part, index) => {
    const key = `${keyPrefix}-${index}`
    if (index % 2 === 1) {
      return [
        <code key={key}>{part.slice(1, -1)}</code>,
      ]
    }
    return part.split(linkPattern).map((piece, pieceIndex) =>
      pieceIndex % 2 === 1 ? (
        <a key={`${key}-${pieceIndex}`} href={piece} target="_blank" rel="noopener noreferrer">
          {piece}
        </a>
      ) : (
        piece
      )
    )
  })
}

export default function NoteText({ text }: { text: string }) {
  const parts = text.split(/```[a-zA-Z0-9]*\n?([\s\S]*?)```/)

  return (
    <div className="lp-text">
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <pre key={index}>
              <code>{part.replace(/\n$/, '')}</code>
            </pre>
          )
        }
        const trimmed = part.replace(/^\n+|\n+$/g, '')
        if (trimmed === '') return null
        return (
          <p key={index}>{inline(trimmed, String(index))}</p>
        )
      })}
    </div>
  )
}
