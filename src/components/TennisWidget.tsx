'use client'

import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts'

const matchStats = [
  { week: 'W1', sets: 2 },
  { week: 'W2', sets: 4 },
  { week: 'W3', sets: 3 },
  { week: 'W4', sets: 6 },
  { week: 'W5', sets: 5 },
  { week: 'W6', sets: 8 },
]

export default function TennisWidget() {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 border-dashed rounded-3xl p-8 bg-zinc-50/20 dark:bg-zinc-900/10 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-medium text-zinc-500 uppercase tracking-[0.2em] font-mono">Tennis Activity</h3>
        <span className="text-2xl font-semibold text-zinc-900 dark:text-white">4.0 ntrp</span>
      </div>

      <div className="flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={matchStats}>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'JetBrains Mono' }}
              dy={10}
            />
            <Tooltip
              cursor={{ fill: 'rgba(94, 113, 83, 0.05)' }}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                fontSize: '10px',
                color: '#fff',
                fontFamily: 'JetBrains Mono'
              }}
            />
            <Bar dataKey="sets" radius={[4, 4, 0, 0]}>
              {matchStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === matchStats.length - 1 ? '#5e7153' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-center border-t border-zinc-100 dark:border-zinc-800 pt-6">
        <div>
          <span className="block text-[10px] text-zinc-400 lowercase italic mb-1">matches won</span>
          <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">24</span>
        </div>
        <div>
          <span className="block text-[10px] text-zinc-400 lowercase italic mb-1">hours / week</span>
          <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">12.5</span>
        </div>
      </div>
    </div>
  )
}
