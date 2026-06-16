'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { BookingDialog } from '@/components/booking-dialog'
import { type Service } from '@/lib/studio-data'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
]

export function SiteHeader({ services }: { services: Service[] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-foreground"
        >
          dalisolstice
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
          <BookingDialog services={services} label="Book a free call" size="sm" />
        </nav>

        <button
          type="button"
          className="flex size-9 items-center justify-center text-foreground md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-2 py-2 text-sm transition-colors',
                  pathname === link.href
                    ? 'bg-primary/5 text-primary'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-2" onClick={() => setOpen(false)}>
              <BookingDialog services={services} label="Book a free call" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
