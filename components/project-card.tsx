import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  link?: string
}

export function ProjectCard({ title, description, imageUrl, link = "#" }: ProjectCardProps) {
  return (
    <Link href={link} className="group">
      <div className="overflow-hidden rounded-lg glass-card transition-all duration-300 hover:border-white/25 hover:shadow-2xl">
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-3 sm:p-4 border-t border-white/10">
          <h3 className="font-medium text-sm sm:text-base">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  )
}
