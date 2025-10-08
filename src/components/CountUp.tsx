import { useEffect, useMemo, useRef, useState } from 'react'

type CountUpProps = {
  to: number | null
  durationMs?: number
  delayMs?: number
  format?: (value: number) => string
  className?: string
  initialValue?: number
  placeholder?: string
}

export default function CountUp({
  to,
  durationMs = 1000,
  delayMs = 0,
  format,
  initialValue = 1,
  className = '',
  placeholder = '-'
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [started, setStarted] = useState(false)
  const [value, setValue] = useState(initialValue)
  const rafRef = useRef<number | null>(null)

  const formatter = useMemo(() => {
    if (format) return format
    const intl = new Intl.NumberFormat('en-US')
    return (v: number) => intl.format(Math.round(v))
  }, [format])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true)
          }
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started || to == null) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    let startTs = 0
    const from = value
    const target = Math.max(0, to)
    const delta = target - from
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (ts: number) => {
      if (!startTs) startTs = ts
      const elapsed = ts - startTs
      const t = Math.min(1, Math.max(0, (elapsed - delayMs) / Math.max(1, durationMs)))
      const eased = easeOutCubic(t)
      setValue(from + delta * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, to, durationMs, delayMs])

  if (to == null) {
    return (
      <span ref={ref} className={className}>{placeholder}</span>
    )
  }

  return <span ref={ref} className={className}>{formatter(value)}</span>
}


