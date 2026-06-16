import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { ServicesSection } from '@/components/services-section'
import { PortfolioGrid } from '@/components/portfolio-grid'
import { getProjects, getServices } from '@/lib/queries'

export default async function HomePage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()])
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader services={services} />
      <main className="flex-1">
        <Hero />
        <ServicesSection />

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-8 md:py-24">
          <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
            <div className="space-y-2 sm:space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Selected work
              </p>
              <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
                Recent projects.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary sm:inline-flex"
            >
              View all
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <PortfolioGrid projects={projects.slice(0, 3)} uniform />
          <div className="mt-6 sm:hidden">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              View all projects
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
