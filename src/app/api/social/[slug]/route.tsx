import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getPostBySlug } from '@/lib/posts'
import { projectBrands } from '@/lib/project-branding'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return Object.keys(projectBrands).map(slug => ({ slug }))
}

async function asset(file: string, type: string) {
  const data = await readFile(path.join(process.cwd(), 'public', file))
  return `data:image/${type};base64,${data.toString('base64')}`
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = projectBrands[slug]
  const post = brand && getPostBySlug('products', slug)
  if (!post) return new Response('Not found', { status: 404 })

  const photo = slug === 'la-cafe' ? await asset('images/social/la-cafe-dish.jpg', 'jpeg') : undefined
  const logo = slug === 'la-cafe'
    ? await asset('images/social/la-cafe-wordmark.png', 'png')
    : slug === 'startdotdev' ? await asset('images/products/startdotdev.png', 'png') : undefined

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '48px 60px', background: '#fbf6ee', color: '#1a1a17', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontSize: 19, letterSpacing: 3, fontWeight: 600 }}>MANOHAR KANAPAKA</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', background: '#18181b', color: 'white', fontSize: 21, fontWeight: 700 }}>MK</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 52, marginTop: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 660 }}>
          <div style={{ display: 'flex', color: brand.accent, fontSize: 19, fontWeight: 600, marginBottom: 18 }}>{brand.label}</div>
          <div style={{ display: 'flex', fontSize: 70, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>{post.title}</div>
          <div style={{ display: 'flex', marginTop: 22, fontSize: 27, lineHeight: 1.45, color: '#52524b' }}>{post.tagline || post.description}</div>
        </div>
        <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 320, height: 320, flexShrink: 0, overflow: 'hidden', borderRadius: 28, background: brand.surface, padding: slug === 'la-cafe' ? 0 : 24 }}>
          {slug === 'la-cafe' && <>
            <img src={photo} alt="" width={320} height={320} style={{ objectFit: 'cover' }} />
            <div style={{ display: 'flex', position: 'absolute', left: 18, top: 18, padding: '10px 16px', borderRadius: 12, background: '#fffaf2' }}><img src={logo} alt="La Cafe" width={120} height={40} style={{ objectFit: 'contain' }} /></div>
          </>}
          {slug === 'court-trips' && <svg width="240" height="270" viewBox="0 0 160 200"><rect x="0" y="0" width="160" height="200" rx="12" fill="#24463d" /><g fill="none" stroke="#d9e7c3" strokeWidth="2"><rect x="18" y="18" width="124" height="164" /><path d="M31 18v164m98-164v164M31 60h98M31 140h98M80 60v80M12 100h136" /></g></svg>}
          {slug === 'courtsidebio' && <div style={{ display: 'flex', width: '100%', padding: 24, borderRadius: 20, background: '#fbfcf8', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 68, height: 68, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: brand.accent, color: 'white', fontSize: 26 }}>AM</div>
            <div style={{ display: 'flex', marginTop: 14, fontSize: 25, fontWeight: 600 }}>Alex Morgan</div>
            <div style={{ display: 'flex', marginTop: 5, fontSize: 15, color: '#526757' }}>Sample coach profile</div>
            <div style={{ display: 'flex', marginTop: 22, width: '100%', padding: 12, justifyContent: 'center', borderRadius: 9, background: '#edf2e8', fontSize: 18 }}>Coaching & hitting practice</div>
          </div>}
          {slug === 'startdotdev' && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img src={logo} alt="Startdotdev" width={52} height={52} style={{ marginBottom: 18 }} />
            {['Research', 'Draft', 'Review'].map(stage => <div key={stage} style={{ display: 'flex', justifyContent: 'center', marginTop: 8, padding: 12, width: '100%', borderRadius: 10, background: '#fbfcf5', border: '1px solid #cbd4bb', color: brand.accent, fontSize: 21 }}>{stage}</div>)}
          </div>}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 22, borderTop: '1px solid #ded8cc', fontSize: 18, color: '#626257' }}><span>TINKERTANK</span><span>mkanapaka.space</span></div>
    </div>,
    { width: 1200, height: 630 },
  )
}
