'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { type Project } from '@/lib/studio-data'

function ProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-md bg-muted text-left focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-base font-medium leading-tight text-foreground">
            {project.title}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {project.category} · {project.year}
          </p>
        </div>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </button>
  )
}

function ProjectLightbox({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const images = project.gallery.length > 0 ? project.gallery : [project.image]

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }
  function next() {
    setIndex((i) => (i + 1) % images.length)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/70 backdrop-blur-sm sm:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-background sm:rounded-2xl">
        {/* Image carousel */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${project.title} image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            priority
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={prev}
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={next}
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ChevronRight className="size-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === index ? 'w-5 bg-background' : 'w-1.5 bg-background/50',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-primary">
                <span>{project.category}</span>
                <span className="text-border">/</span>
                <span className="text-muted-foreground">{project.year}</span>
              </div>
              <h2 className="mt-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="size-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>
          {images.length > 1 && (
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {index + 1} / {images.length}
            </p>
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
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter)

  return (
    <>
      {!uniform && (
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors',
                filter === cat
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setActive(project)}
          />
        ))}
      </div>

      {active && (
        <ProjectLightbox project={active} onClose={() => setActive(null)} />
      )}
    </>
  )
}
