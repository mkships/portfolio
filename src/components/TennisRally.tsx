'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type GameState = 'idle' | 'playing' | 'ended'

const MIN_MS = 300
const MAX_MS = 800

export default function TennisRally() {
  const [state, setState] = useState<GameState>('idle')
  const [shots, setShots] = useState(0)
  const [endReason, setEndReason] = useState('')
  const [ballSide, setBallSide] = useState<'near' | 'far'>('near')
  const lastTapRef = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const startTimer = useCallback(() => {
    clearTimer()
    timeoutRef.current = setTimeout(() => {
      setEndReason('late footwork')
      setState('ended')
    }, MAX_MS)
  }, [])

  const handleTap = useCallback(() => {
    if (state === 'ended') return

    const now = Date.now()

    if (state === 'idle') {
      setState('playing')
      setShots(1)
      setBallSide('far')
      lastTapRef.current = now
      startTimer()
      return
    }

    const gap = now - lastTapRef.current

    if (gap < MIN_MS) {
      clearTimer()
      setEndReason('overhit')
      setState('ended')
      return
    }

    if (gap > MAX_MS) {
      clearTimer()
      setEndReason('late footwork')
      setState('ended')
      return
    }

    setShots((s) => s + 1)
    setBallSide((prev) => (prev === 'near' ? 'far' : 'near'))
    lastTapRef.current = now
    startTimer()
  }, [state, startTimer])

  const reset = useCallback(() => {
    clearTimer()
    setState('idle')
    setShots(0)
    setEndReason('')
    setBallSide('near')
    lastTapRef.current = 0
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (state === 'ended') {
          reset()
        } else {
          handleTap()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleTap, reset, state])

  useEffect(() => {
    return () => clearTimer()
  }, [])

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 border-dashed rounded-3xl p-8 bg-zinc-50/20 dark:bg-zinc-900/10 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em] font-mono mb-1">
          Rally Rhythm
        </h3>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic lowercase">
          keep the rally alive.
        </p>
      </div>

      {/* Court + Game */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
        {/* Tennis Court */}
        <div className="relative w-full max-w-[220px] mx-auto mb-6">
          {/* Court surface */}
          <div className="relative w-full aspect-[1/1.6] bg-moss/10 dark:bg-moss/5 border border-moss/30 rounded-lg overflow-hidden">
            {/* Center service line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-moss/30" />
            {/* Net */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-zinc-400 dark:bg-zinc-500" />
            {/* Center mark top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-moss/30" />
            {/* Center mark bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-moss/30" />
            {/* Service boxes top */}
            <div className="absolute top-[20%] left-0 right-0 h-px bg-moss/20" />
            <div className="absolute top-[20%] bottom-1/2 left-1/2 w-px bg-moss/20" />
            {/* Service boxes bottom */}
            <div className="absolute bottom-[20%] left-0 right-0 h-px bg-moss/20" />
            <div className="absolute top-1/2 bottom-[20%] left-1/2 w-px bg-moss/20" />

            {/* Ball */}
            {state !== 'idle' && (
              <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-200 ease-out"
                style={{
                  top: ballSide === 'far' ? '20%' : '75%',
                }}
              >
                <div className={`w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)] ${state === 'playing' ? 'scale-100' : 'scale-75 opacity-50'}`} />
              </div>
            )}

            {/* Idle ball */}
            {state === 'idle' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
              </div>
            )}
          </div>
        </div>

        {/* Controls / State */}
        {state === 'idle' && (
          <div className="text-center">
            <button
              onClick={handleTap}
              className="px-6 py-3 bg-moss text-white text-sm font-medium rounded-full hover:bg-moss-dark transition-colors lowercase"
            >
              tap to serve
            </button>
            <p className="text-[10px] text-zinc-400 mt-3 font-mono lowercase">
              or press spacebar
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 lowercase">
                tap every 300–800ms. too fast → overhit. too slow → late.
              </p>
            </div>
          </div>
        )}

        {state === 'playing' && (
          <button
            onClick={handleTap}
            className="text-center w-full flex flex-col items-center cursor-pointer select-none"
          >
            <span className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
              {shots}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider mt-1">shots</span>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
              <span className="text-[10px] text-zinc-400 font-mono lowercase">keep tapping...</span>
            </div>
          </button>
        )}

        {state === 'ended' && (
          <div className="text-center w-full">
            <p className="text-[10px] font-mono uppercase tracking-wider text-red-400 mb-3">
              {endReason}
            </p>

            <div className="mb-6">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-1">your rally</span>
              <span className="text-4xl font-semibold text-moss font-mono tabular-nums">{shots}</span>
              <span className="text-sm text-zinc-400 font-mono ml-1">shots</span>
            </div>

            <button
              onClick={reset}
              className="px-6 py-3 bg-moss text-white text-sm font-medium rounded-full hover:bg-moss-dark transition-colors lowercase"
            >
              play again
            </button>
            <p className="text-[10px] text-zinc-400 mt-2 font-mono lowercase">
              or press spacebar
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
