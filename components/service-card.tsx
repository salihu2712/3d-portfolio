import Image from "next/image"

interface ServiceCardProps {
  image: string
  alt: string
  title: string
  description: string
}

export function ServiceCard({ image, alt, title, description }: ServiceCardProps) {
  return (
    <div className="rounded-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.45)] relative flex flex-col justify-between">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
      </div>
      <div className="relative z-10 p-4 bg-black/40 backdrop-blur-md border-b border-white/10">
        <p className="font-medium text-xl">{title}</p>
      </div>
      <div className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10 p-4">
        <p className="text-xs md:text-sm">{description}</p>
      </div>
    </div>
  )
}
