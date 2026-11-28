'use client'

import { useState } from 'react'
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react'

// What was typed, minus the things that tend to come along when a passphrase is copied from
// a settings page: spaces or line breaks at either end, the variable name in front, and quotes.
function normalise(value: string) {
  return value
    .trim()
    .replace(/^LEARNING_OWNER_KEY\s*=\s*/i, '')
    .replace(/^(["'])(.*)\1$/, '$2')
    .trim()
}

// The owner types a passphrase once per device. Visitors can ignore this: everything is readable without it.
export default function OwnerUnlock({
  unlocked,
  onUnlock,
  onLock,
}: {
  unlocked: boolean
  onUnlock: (key: string) => Promise<string | null>
  onLock: () => void
}) {
  const [open, setOpen] = useState(false)
  const [key, setKey] = useState('')
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (unlocked) {
    return (
      <button type="button" onClick={onLock} className="lp-quiet">
        <LockKeyholeOpen size={15} aria-hidden="true" /> Editing is unlocked here. Lock
      </button>
    )
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="lp-quiet">
        <LockKeyhole size={15} aria-hidden="true" /> Unlock editing
      </button>
    )
  }

  return (
    <form
      className="lp-form"
      style={{ width: '100%', maxWidth: '26rem' }}
      onSubmit={async event => {
        event.preventDefault()
        const candidate = normalise(key)
        if (candidate === '') return
        setBusy(true)
        const problem = await onUnlock(candidate)
        setBusy(false)
        if (problem) {
          setError(problem)
          return
        }
        setKey('')
        setError('')
        setOpen(false)
      }}
    >
      <label htmlFor="owner-key" className="lp-label">
        Owner passphrase
      </label>      <input
        id="owner-key"
        type={visible ? 'text' : 'password'}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        value={key}
        autoComplete="current-password"
        aria-describedby={error ? 'owner-key-error' : undefined}
        onChange={event => setKey(event.target.value)}
        className="lp-field"
      />
      <label className="lp-hint" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', minHeight: '2.75rem', cursor: 'pointer' }}>
        <input type="checkbox" checked={visible} onChange={event => setVisible(event.target.checked)} />
        Show what I typed
      </label>
      {error && (
        <p id="owner-key-error" role="alert" className="lp-error">
          {error}
        </p>
      )}
      <div className="lp-actions">
        <button type="submit" disabled={busy || normalise(key) === ''} className="lp-btn is-primary">
          Unlock
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            setError('')
            setKey('')
          }}
          className="lp-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
