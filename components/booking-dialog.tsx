'use client'

import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Camera,
  Film,
  PenTool,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { services } from '@/lib/studio-data'

const serviceIcons: Record<string, React.ElementType> = {
  photography: Camera,
  videography: Film,
  design: PenTool,
}

const timeSlots = ['09:00', '11:00', '13:00', '15:00', '17:00']

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type BookingDialogProps = {
  label?: string
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  defaultService?: string
}

export function BookingDialog({
  label = 'Book a Consultation',
  variant = 'default',
  size = 'lg',
  className,
  defaultService,
}: BookingDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [service, setService] = useState<string | null>(defaultService ?? null)
  const [viewDate, setViewDate] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const today = new Date()
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    return cells
  }, [year, month])

  function reset() {
    setStep(1)
    setService(defaultService ?? null)
    setSelectedDate(null)
    setSelectedTime(null)
    setSubmitted(false)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) setTimeout(reset, 200)
  }

  function isPast(day: number) {
    const date = new Date(year, month, day)
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < start
  }

  const selectedServiceTitle = services.find((s) => s.id === service)?.title

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button variant={variant} size={size} className={className} />}
      >
        {label}
      </DialogTrigger>
      <DialogContent
        showCloseButton={!submitted}
        className="sm:max-w-md gap-0 overflow-hidden p-0"
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-6" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-semibold text-foreground">
                Request received
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Thank you for reaching out to dalisolstice. We&apos;ll be in
                touch shortly to confirm the details of your consultation.
              </p>
            </div>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Header / progress */}
            <div className="border-b px-6 py-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                Step {step} of 3
              </p>
              <h2 className="mt-1 font-heading text-2xl font-semibold leading-none text-foreground">
                {step === 1 && 'Choose a service'}
                {step === 2 && 'Select a date & time'}
                {step === 3 && 'Your details'}
              </h2>
              <div className="mt-4 flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={cn(
                      'h-0.5 flex-1 rounded-full transition-colors',
                      s <= step ? 'bg-primary' : 'bg-border',
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="px-6 py-5">
              {/* Step 1 — service */}
              {step === 1 && (
                <div className="flex flex-col gap-2.5">
                  {services.map((s) => {
                    const Icon = serviceIcons[s.id]
                    const active = service === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setService(s.id)}
                        className={cn(
                          'flex items-start gap-3 rounded-md border p-3 text-left transition-colors',
                          active
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/40',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-9 shrink-0 items-center justify-center rounded-md',
                            active
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground',
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="space-y-0.5">
                          <span className="block font-medium text-foreground">
                            {s.title}
                          </span>
                          <span className="block text-xs leading-relaxed text-muted-foreground">
                            {s.description}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Step 2 — calendar */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => setViewDate(new Date(year, month - 1, 1))}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="font-heading text-lg font-medium text-foreground">
                      {MONTHS[month]} {year}
                    </span>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => setViewDate(new Date(year, month + 1, 1))}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {WEEKDAYS.map((d) => (
                      <span
                        key={d}
                        className="py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground"
                      >
                        {d}
                      </span>
                    ))}
                    {days.map((d, i) => {
                      if (d === null) return <span key={`e-${i}`} />
                      const disabled = isPast(d)
                      const active = selectedDate === d
                      return (
                        <button
                          key={d}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedDate(d)}
                          className={cn(
                            'flex aspect-square items-center justify-center rounded-md text-sm transition-colors',
                            disabled && 'text-muted-foreground/30',
                            !disabled &&
                              !active &&
                              'text-foreground hover:bg-muted',
                            active &&
                              'bg-primary text-primary-foreground',
                          )}
                        >
                          {d}
                        </button>
                      )
                    })}
                  </div>

                  {selectedDate && (
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Available times
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={cn(
                              'rounded-md border px-3 py-1.5 text-sm transition-colors',
                              selectedTime === t
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border text-foreground hover:border-primary/40',
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3 — contact */}
              {step === 3 && (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="booking-name">Full name</Label>
                    <Input id="booking-name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="booking-email">Email</Label>
                    <Input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="booking-concept">Tell us about your concept</Label>
                    <Textarea
                      id="booking-concept"
                      rows={3}
                      placeholder="A few words about what you have in mind..."
                    />
                  </div>
                  <div className="rounded-md bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {selectedServiceTitle}
                    </span>
                    {selectedDate && (
                      <>
                        {' · '}
                        {MONTHS[month]} {selectedDate}, {year}
                        {selectedTime && ` at ${selectedTime}`}
                      </>
                    )}
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Secure My Consultation
                  </Button>
                </form>
              )}
            </div>

            {/* Footer nav */}
            {step < 3 && (
              <div className="flex items-center justify-between border-t bg-muted/40 px-6 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className={cn(step === 1 && 'invisible')}
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={
                    (step === 1 && !service) ||
                    (step === 2 && (!selectedDate || !selectedTime))
                  }
                >
                  Continue
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className="flex items-center border-t bg-muted/40 px-6 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
