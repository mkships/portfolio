'use client'

import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'

const KCAL_PER_KG = 7700
const STEPS_KCAL_MAP = (steps: number) => {
  // ~0.04 kcal per step, with diminishing returns above 15k
  if (steps <= 5000) return steps * 0.02 // minimal impact
  if (steps <= 15000) return 100 + (steps - 5000) * 0.045
  return 100 + 10000 * 0.045 + (steps - 15000) * 0.015 // diminishing
}
const WORKOUT_KCAL = 400

export default function CompoundingLab() {
  const [weight, setWeight] = useState(80)
  const [calorieBurn, setCalorieBurn] = useState(200)
  const [steps, setSteps] = useState(8000)
  const [workouts, setWorkouts] = useState(3)

  const stepsPercent = ((steps - 2000) / (18000 - 2000)) * 100
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

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 border-dashed rounded-3xl p-8 bg-zinc-50/20 dark:bg-zinc-900/10">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em] font-mono mb-1">
          Daily Calorie Deficit
        </h3>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic lowercase">
          small daily wins compound into big transformations.
        </p>
      </div>

      {/* Current Weight */}
      <div className="mb-6">
        <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 block mb-2">
          your current weight
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeight(Math.max(40, weight - 1))}
            className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500 hover:border-moss hover:text-moss transition-colors"
          >
            −
          </button>
          <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums w-20 text-center">
            {weight}
            <span className="text-xs font-normal text-zinc-400 ml-1">kg</span>
          </span>
          <button
            onClick={() => setWeight(Math.min(200, weight + 1))}
            className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-500 hover:border-moss hover:text-moss transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Calorie Burn */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            daily calorie burn
          </label>
          <span className="text-[9px] text-zinc-400 dark:text-zinc-500 italic lowercase">
            from diet choices — skipping snacks, lighter meals
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={500}
            step={25}
            value={calorieBurn}
            onChange={(e) => setCalorieBurn(+e.target.value)}
            className="flex-1 h-1 appearance-none bg-zinc-200 dark:bg-zinc-700 rounded-full outline-none accent-moss cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="text-sm font-semibold font-mono tabular-nums text-zinc-900 dark:text-zinc-100 w-20 text-right">
            {calorieBurn} <span className="text-[9px] font-normal text-zinc-400">kcal</span>
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            daily steps
          </label>
          <span className="text-sm font-semibold font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
            {steps.toLocaleString()}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={2000}
            max={18000}
            step={500}
            value={steps}
            onChange={(e) => setSteps(+e.target.value)}
            className="w-full h-1 appearance-none bg-transparent rounded-full outline-none cursor-pointer relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-moss [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20"
          />
          {/* Track with zones */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 flex">
              {/* Dead zone: 2k-5k */}
              <div
                className="h-full bg-red-300/40 dark:bg-red-400/20"
                style={{ width: `${deadZoneEnd}%` }}
              />
              {/* Sweet spot: 5k-15k */}
              <div
                className="h-full bg-moss/30"
                style={{ width: `${sweetSpotEnd - deadZoneEnd}%` }}
              />
              {/* Diminishing: 15k+ */}
              <div
                className="h-full bg-yellow-400/30 dark:bg-yellow-400/15"
                style={{ width: `${100 - sweetSpotEnd}%` }}
              />
            </div>
          </div>
          {/* Zone indicators */}
          <div className="absolute -translate-y-0 left-0 right-0 pointer-events-none">
            <div
              className="absolute text-[8px] font-mono text-red-400/80 dark:text-red-400/60 whitespace-nowrap"
              style={{ left: `${deadZoneEnd / 2}%`, transform: 'translateX(-50%)' }}
            >
              low impact
            </div>
            <div
              className="absolute text-[8px] font-mono text-moss/70 whitespace-nowrap"
              style={{ left: `${deadZoneEnd + (sweetSpotEnd - deadZoneEnd) / 2}%`, transform: 'translateX(-50%)' }}
            >
              sweet spot
            </div>
            <div
              className="absolute text-[8px] font-mono text-yellow-500/70 dark:text-yellow-400/50 whitespace-nowrap"
              style={{ left: `${sweetSpotEnd + (100 - sweetSpotEnd) / 2}%`, transform: 'translateX(-50%)' }}
            >
              diminishing
            </div>
          </div>
        </div>
      </div>

      {/* Workouts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            workouts / week
          </label>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button
              key={n}
              onClick={() => setWorkouts(n)}
              className={`flex-1 py-2 rounded-lg text-xs font-mono transition-all ${
                n === workouts
                  ? 'bg-moss text-white font-semibold'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[140px] w-full mb-4" style={{ minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#71717a', fontFamily: 'JetBrains Mono' }}
              interval={4}
              dy={6}
            />
            <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                borderRadius: '10px',
                border: 'none',
                fontSize: '10px',
                color: '#fff',
                fontFamily: 'JetBrains Mono',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [`${value} kg`, 'weight']}
            />
            <ReferenceLine
              y={weight}
              stroke="#71717a"
              strokeDasharray="3 3"
              strokeWidth={0.5}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#5e7153"
              fill="#5e7153"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Result */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 text-center">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 block mb-2">
          in 90 days, you could lose
        </span>
        <span className="text-3xl font-semibold text-moss font-mono tabular-nums">
          {weightLost > 0 ? weightLost : 0} kg
        </span>
        <p className="text-[10px] text-zinc-400 italic mt-1 lowercase">
          {weight} kg → {weightLost > 0 ? day90Weight : weight} kg
        </p>
      </div>
    </div>
  )
}
