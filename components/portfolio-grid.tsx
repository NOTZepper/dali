'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { type Project } from '@/lib/studio-data'

function GalleryModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [idx, setIdx] = useState(0)
  const total = project.gallery.length
  const hasPrev = idx > 0
  const hasNext = idx < total - 1

  function prev() {
    setIdx((i) => Math.max(0, i - 1))
  }
  function next() {
    setIdx((i) => Math.min(total - 1, i + 1))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-foreground/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-primary">
            {project.category}
          </span>
          <span className="text-background/30">/</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-wider text-background/50">
            {project.year}
          </span>
        </div>
        {total > 1 && (
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[0.65rem] text-background/50">
            {idx + 1} / {total}
          </span>
        )}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-background/10 hover:text-background"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Main image area */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 sm:px-16">
        {hasPrev && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 z-10 flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20 sm:left-3"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        <div className="relative h-full w-full" style={{ maxHeight: '62vh' }}>
          <Image
            key={project.gallery[idx]}
            src={project.gallery[idx]}
            alt={`${project.title} — image ${idx + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority={idx === 0}
          />
        </div>

        {hasNext && (
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 z-10 flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20 sm:right-3"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </div>

      {/* Footer — title, description, thumbnails */}
      <div className="shrink-0 px-4 pb-4 pt-3 sm:px-6 sm:pb-6">
        <div className="mx-auto max-w-2xl space-y-2">
          <h2 className="font-heading text-xl font-semibold text-background sm:text-2xl">
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed text-background/60 line-clamp-2">
            {project.description}
          </p>

          {total > 1 && (
            <div className="flex gap-2 overflow-x-auto pt-1 no-scrollbar">
              {project.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={cn(
                    'relative size-12 shrink-0 overflow-hidden rounded-sm transition-opacity sm:size-14',
                    i === idx
                      ? 'ring-2 ring-primary ring-offset-1 ring-offset-foreground/95'
                      : 'opacity-50 hover:opacity-80',
                  )}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

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
      <div
        className={cn(
          'grid gap-4',
          uniform
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActive(project)}
            className="group relative aspect-[4/3] overflow-hidden rounded-md bg-muted text-left"
          >
            <Image
              src={project.image}
              alt={`${project.title} — ${project.category}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Category badge */}
            <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-foreground backdrop-blur-sm">
              {project.category}
            </span>
            {/* Multiple images indicator */}
            {project.gallery.length > 1 && (
              <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-sm bg-foreground/60 font-mono text-[0.6rem] text-background">
                {project.gallery.length}
              </span>
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-background">
                <span className="block font-heading text-lg font-medium leading-tight">
                  {project.title}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-background/80">
                  {project.year}
                </span>
              </span>
              <ArrowUpRight className="size-5 text-background" />
            </span>
          </button>
        ))}
      </div>

      {active && (
        <GalleryModal project={active} onClose={() => setActive(null)} />
      )}
    </>
  )
}
