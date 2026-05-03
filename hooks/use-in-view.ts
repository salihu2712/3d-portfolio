"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || (triggerOnce && isInView)) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin, triggerOnce])

  return [ref, isInView]
}
