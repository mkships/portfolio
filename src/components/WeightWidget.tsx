'use client'

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { month: 'Jan', weight: 88 },
  { month: 'Feb', weight: 86.5 },
  { month: 'Mar', weight: 85 },
  { month: 'Apr', weight: 83.2 },
  { month: 'May', weight: 81.8 },
  { month: 'Jun', weight: 79.5 },
]

export default function WeightWidget() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 border-dashed rounded-3xl p-8 bg-zinc-50/20 dark:bg-zinc-900/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em] font-mono">Weight Tracker</h3>
        <span className="text-2xl font-semibold text-zinc-900 dark:text-white">-8.5 kg</span>
      </div>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'JetBrains Mono' }}
              dy={10}
            />
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '12px',
                border: 'none',
                fontSize: '10px',
                color: '#fff',
                fontFamily: 'JetBrains Mono'
              }}
              itemStyle={{ color: '#7a8c6f' }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#5e7153"
              fill="#5e7153"
              fillOpacity={0.1}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-6 text-xs text-zinc-400 italic text-center leading-relaxed">
        consistent running and metabolic focus.
      </p>
    </div>
  )
}
