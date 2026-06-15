import Image from 'next/image'
import { Camera, Film, PenTool } from 'lucide-react'

import { services } from '@/lib/studio-data'

const meta: Record<string, { icon: React.ElementType; image: string }> = {
  photography: { icon: Camera, image: '/images/work-photography.png' },
  videography: { icon: Film, image: '/images/work-videography.png' },
  design: { icon: PenTool, image: '/images/work-design.png' },
}

export function ServicesSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            What we do
          </p>
          <h2 className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Three disciplines, one sensibility.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-2xl font-medium text-foreground">
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
