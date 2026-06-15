'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { type Project } from '@/lib/studio-data'

export function PortfolioGrid({
  projects,
  uniform = false,
}: {
  projects: Project[]
  uniform?: boolean
}) {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActive(project)}
            className={cn(
              'group relative overflow-hidden rounded-md bg-muted text-left',
              !uniform && project.span,
            )}
          >
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-background">
                <span className="block font-heading text-lg font-medium leading-tight">
                  {project.title}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-background/80">
                  {project.category}
                </span>
              </span>
              <ArrowUpRight className="size-5 text-background" />
            </span>
          </button>
        ))}
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(o) => !o && setActive(null)}
      >
        <DialogContent className="max-h-[88vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
          {active && (
            <div>
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                <Image
                  src={active.gallery[0]}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-wider text-primary">
                  <span>{active.category}</span>
                  <span className="text-border">/</span>
                  <span className="text-muted-foreground">{active.year}</span>
                </div>
                <DialogTitle className="font-heading text-3xl font-semibold">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  {active.description}
                </DialogDescription>

                {active.gallery.length > 1 && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {active.gallery.slice(1).map((src, i) => (
                      <div
                        key={src}
                        className="relative aspect-square overflow-hidden rounded-md bg-muted"
                      >
                        <Image
                          src={src}
                          alt={`${active.title} detail ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
