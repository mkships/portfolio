import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBio } from '@/lib/posts'

// The main site's header and footer around a page. Shared by the (site) layout and the 404 page.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header openTo={getBio().openTo} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
