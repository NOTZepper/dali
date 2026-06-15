import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { BookingDialogServer } from '@/components/booking-dialog-server'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="space-y-7">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Photography · Videography · Design
          </p>
          <h1 className="text-balance font-heading text-5xl font-semibold leading-[1.05] text-foreground md:text-7xl">
            A studio for the considered image.
          </h1>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            dalisolstice is a creative studio crafting editorial photography,
            cinematic motion, and design with patience, intention, and an eye
            for light.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <BookingDialogServer label="Book a Consultation" />
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              View our work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted md:aspect-[3/4]">
          <Image
            src="/images/hero.png"
            alt="Editorial studio photograph of a model in a flowing burgundy garment"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
