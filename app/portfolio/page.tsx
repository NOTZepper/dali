import type { Metadata } from 'next'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PortfolioGrid } from '@/components/portfolio-grid'
import { getProjects, getServices } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Portfolio — dalisolstice',
  description:
    'Selected photography, videography, and design work from the dalisolstice studio.',
}

export default async function PortfolioPage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()])
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader services={services} />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-5 pt-10 pb-12 md:px-8 md:pt-20 md:pb-24">
          <div className="mb-8 max-w-xl space-y-3 md:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Portfolio
            </p>
            <h1 className="text-balance font-heading text-3xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              A body of considered work.
            </h1>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              Photography, motion, and design projects spanning editorial,
              brand, and personal commissions. Select any piece to explore it
              further.
            </p>
          </div>
          <PortfolioGrid projects={projects} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
