"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface Project {
  title: string
  description: string
  imageUrl: string
}

interface ProjectSliderProps {
  projects: Project[]
}

export function ProjectSlider({ projects }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMobile()
  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, projects.length - itemsPerView)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    if (sliderRef.current) {
      const itemWidth = 100 / (isMobile ? 1 : 3)
      const translateX = currentIndex * -itemWidth
      sliderRef.current.style.transform = `translateX(${translateX}%)`
    }
  }, [currentIndex, isMobile])

  return (
    <div className="relative overflow-hidden">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ width: `${isMobile ? 100 * projects.length : (100 * projects.length) / 3}%` }}
      >
        {projects.map((project, index) => (
          <div key={index} className="px-2 md:px-3" style={{ width: `${isMobile ? 100 : 100 / 3}%` }}>
            <div className="glass-card rounded-lg overflow-hidden group hover:border-white/25 hover:shadow-2xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 border-t border-white/10">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 border-0 rounded-full hover:bg-black/70 w-8 h-8 md:w-10 md:h-10"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 border-0 rounded-full hover:bg-black/70 w-8 h-8 md:w-10 md:h-10"
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}
