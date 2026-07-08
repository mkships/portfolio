'use client'

import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'

const KCAL_PER_KG = 7700
const MOSS = '#5f7d00'
const STEPS_KCAL_MAP = (steps: number) => {
  // ~0.04 kcal per step, with diminishing returns above 15k
  if (steps <= 5000) return steps * 0.02 // minimal impact
  if (steps <= 15000) return 100 + (steps - 5000) * 0.045
  return 100 + 10000 * 0.045 + (steps - 15000) * 0.015 // diminishing
}
const WORKOUT_KCAL = 400

const labelClass = 'text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400'
const hintClass = 'text-[9px] italic text-zinc-400 dark:text-zinc-500'
const valueClass = 'text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100'
const controlBtnClass =
  'flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 text-xs text-zinc-500 transition-colors hover:border-tennis hover:text-moss dark:border-zinc-700 dark:hover:border-moss-light dark:hover:text-moss-light'

export default function CompoundingLab() {
  const [weight, setWeight] = useState(80)
  const [calorieBurn, setCalorieBurn] = useState(200)
  const [steps, setSteps] = useState(8000)
  const [workouts, setWorkouts] = useState(3)

  // Zone boundaries as percentages
  const deadZoneEnd = ((5000 - 2000) / (18000 - 2000)) * 100
  const sweetSpotEnd = ((15000 - 2000) / (18000 - 2000)) * 100

  const { data, day90Weight } = useMemo(() => {
    const dailyStepsBurn = STEPS_KCAL_MAP(steps)
    const dailyWorkoutBurn = (workouts * WORKOUT_KCAL) / 7
    const dailyTotalBurn = calorieBurn + dailyStepsBurn + dailyWorkoutBurn

    const points = []
    for (let day = 0; day <= 90; day += 3) {
      const totalBurned = dailyTotalBurn * day
      const weightLoss = totalBurned / KCAL_PER_KG
      const projected = +(weight - weightLoss).toFixed(1)

      points.push({
        day,
        label: day === 0 ? 'now' : `d${day}`,
        weight: Math.max(projected, weight * 0.75), // floor at 75% of start
      })
    }

    const last = points[points.length - 1]
    return { data: points, day90Weight: last.weight }
  }, [weight, calorieBurn, steps, workouts])

  const weightLost = +(weight - day90Weight).toFixed(1)

  const sliderClass =
    'cursor-pointer appearance-none bg-zinc-200 outline-none dark:bg-zinc-700 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss dark:[&::-webkit-slider-thumb]:bg-moss-light'

  return (
    <div className="p-5 sm:p-6">
      {/* Current Weight */}
      <div className="mb-6">
        <label className={`${labelClass} mb-2 block`}>Your current weight</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeight(Math.max(40, weight - 1))}
            className={controlBtnClass}
            aria-label="Decrease weight"
          >
            −
          </button>
          <span className="w-20 text-center text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
            {weight}
            <span className="ml-1 text-xs font-normal text-zinc-400">kg</span>
          </span>
          <button
            onClick={() => setWeight(Math.min(200, weight + 1))}
            className={controlBtnClass}
            aria-label="Increase weight"
          >
            +
          </button>
        </div>
      </div>

      {/* Calorie Burn */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className={labelClass}>Daily calorie deficit</label>
          <span className={hintClass}>from diet — skipping snacks, lighter meals</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={calorieBurn}
            onChange={(e) => setCalorieBurn(+e.target.value)}
            className={`h-1 flex-1 rounded-full accent-moss ${sliderClass}`}
          />
          <span className={`${valueClass} w-20 text-right`}>
            {calorieBurn} <span className="text-[9px] font-normal text-zinc-400">kcal</span>
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className={labelClass}>Daily steps</label>
          <span className={valueClass}>{steps.toLocaleString()}</span>
        </div>
        <div className="relative pb-4">
          <input
            type="range"
            min={2000}
            max={18000}
            step={500}
            value={steps}
            onChange={(e) => setSteps(+e.target.value)}
            className={`relative z-10 h-1 w-full rounded-full bg-transparent ${sliderClass}`}
          />
          {/* Track with zones */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full">
            <div className="absolute inset-0 flex">
              <div
                className="h-full bg-red-300/40 dark:bg-red-400/20"
                style={{ width: `${deadZoneEnd}%` }}
              />
              <div
                className="h-full bg-moss/30 dark:bg-moss-light/20"
                style={{ width: `${sweetSpotEnd - deadZoneEnd}%` }}
              />
              <div
                className="h-full bg-tennis/35 dark:bg-tennis/15"
                style={{ width: `${100 - sweetSpotEnd}%` }}
              />
            </div>
          </div>
          {/* Zone indicators */}
          <div className="pointer-events-none absolute left-0 right-0 top-full mt-1">
            <div
              className="absolute whitespace-nowrap text-[8px] font-medium uppercase tracking-wide text-red-400/80 dark:text-red-400/60"
              style={{ left: `${deadZoneEnd / 2}%`, transform: 'translateX(-50%)' }}
            >
              low impact
            </div>
            <div
              className="absolute whitespace-nowrap text-[8px] font-medium uppercase tracking-wide text-moss/80 dark:text-moss-light/80"
              style={{ left: `${deadZoneEnd + (sweetSpotEnd - deadZoneEnd) / 2}%`, transform: 'translateX(-50%)' }}
            >
              sweet spot
            </div>
            <div
              className="absolute whitespace-nowrap text-[8px] font-medium uppercase tracking-wide text-moss-dark/70 dark:text-tennis/70"
              style={{ left: `${sweetSpotEnd + (100 - sweetSpotEnd) / 2}%`, transform: 'translateX(-50%)' }}
            >
              diminishing
            </div>
          </div>
        </div>
      </div>

      {/* Workouts */}
      <div className="mb-8">
        <label className={`${labelClass} mb-2 block`}>Workouts / week</label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button
              key={n}
              onClick={() => setWorkouts(n)}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                n === workouts
                  ? 'bg-moss font-semibold text-white dark:bg-moss-light dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-500 hover:border hover:border-tennis/60 dark:bg-zinc-800 dark:hover:border-moss-light/60'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-4 h-[140px] w-full" style={{ minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#78756b' }}
              interval={4}
              dy={6}
            />
            <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 23, 0.92)',
                borderRadius: '10px',
                border: '1px solid rgba(231, 226, 216, 0.12)',
                fontSize: '10px',
                color: '#fbf6ee',
                padding: '8px 12px',
              }}
              formatter={(value) => [`${value} kg`, 'weight']}
            />
            <ReferenceLine
              y={weight}
              stroke="#a8a496"
              strokeDasharray="3 3"
              strokeWidth={0.5}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke={MOSS}
              fill={MOSS}
              fillOpacity={0.12}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Result */}
      <div className="border-t border-zinc-200 pt-5 text-center dark:border-zinc-800">
        <span className={`${labelClass} mb-2 block`}>In 90 days, you could lose</span>
        <span className="text-3xl font-semibold tabular-nums text-moss dark:text-moss-light">
          {weightLost > 0 ? weightLost : 0} kg
        </span>
        <p className={`${hintClass} mt-1`}>
          {weight} kg → {weightLost > 0 ? day90Weight : weight} kg
        </p>
      </div>
    </div>
  )
}
