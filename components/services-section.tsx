import Image from 'next/image'
import { Camera, Film, PenTool } from 'lucide-react'

import { getServices } from '@/lib/queries'

const meta: Record<string, { icon: React.ElementType; image: string }> = {
  photography: { icon: Camera, image: '/images/work-photography.png' },
  videography: { icon: Film, image: '/images/work-videography.png' },
  design: { icon: PenTool, image: '/images/work-design.png' },
}

export async function ServicesSection() {
  const services = await getServices()
  return (
    <section className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-8 md:py-24">
        <div className="max-w-xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            What we do
          </p>
          <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
            Three disciplines, one sensibility.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-6">
          {services.map((service) => {
            const { icon: Icon, image } = meta[service.id]
            return (
              <article
                key={service.id}
                className="group overflow-hidden rounded-md border border-border/60 bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`${service.title} work by dalisolstice`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4 sm:space-y-3 sm:p-6">
                  <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary sm:size-10">
                    <Icon className="size-4 sm:size-5" />
                  </span>
                  <h3 className="font-heading text-xl font-medium text-foreground sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
