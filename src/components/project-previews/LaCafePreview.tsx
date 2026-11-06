'use client'

import { useState } from 'react'
import Image from 'next/image'
import PreviewPicker from './PreviewPicker'

const dishes = [
  {
    category: 'Bowls',
    name: 'Grilled Chicken with Herbed Rice',
    description: 'Grilled chicken and fragrant herbed rice in a bowl sized for lunch.',
    portion: 'One meal bowl',
    image: 'herbed-rice',
  },
  {
    category: 'Breakfast',
    name: 'English Breakfast',
    description: 'A full café breakfast plate for a slow morning.',
    portion: 'One full plate',
    image: 'english-breakfast',
  },
  {
    category: 'Bakes',
    name: 'Ragi Walnut Fudge Brownie',
    description: 'A fudgy brownie with ragi and walnuts.',
    portion: 'One brownie square',
    image: 'ragi-brownie',
  },
  {
    category: 'Drinks',
    name: 'Classic Iced Matcha',
    description: 'Earthy matcha served over ice.',
    portion: 'One cup',
    image: 'iced-matcha',
  },
]

export default function LaCafePreview() {
  const [selected, setSelected] = useState(0)
  const dish = dishes[selected]

  return (
    <div className="space-y-4">
      <PreviewPicker label="Menu categories" options={dishes.map(item => item.category)} selected={selected} onSelect={setSelected} />
      <div className="overflow-hidden rounded-2xl border border-[#e8d9cc] bg-[#fffaf2] text-[#2f302c] sm:grid sm:grid-cols-[1.15fr_1fr]">
        <div className="relative aspect-[4/3] bg-[#eee2d4] sm:aspect-auto sm:min-h-64">
          <Image
            src={`/images/products/la-cafe/${dish.image}.webp`}
            alt={dish.name}
            fill
            sizes="(min-width: 768px) 380px, (min-width: 640px) 52vw, calc(100vw - 84px)"
            className="object-cover"
          />
        </div>
        <div aria-live="polite" className="flex flex-col justify-center p-5 sm:p-6">
          <Image src="/images/products/la-cafe/wordmark.webp" alt="La Cafe" width={126} height={42} className="mb-4 h-auto w-28" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7b3225]">{dish.category}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-[#692a20]">{dish.name}</h3>
          <p className="mt-3 text-sm leading-relaxed">{dish.description}</p>
          <p className="mt-4 border-t border-[#e8d9cc] pt-3 text-xs font-medium text-[#654b3f]">{dish.portion}</p>
        </div>
      </div>
    </div>
  )
}
