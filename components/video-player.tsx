"use client"

import { useState } from "react"
import Image from "next/image"
import { PlayCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type VideoSource =
  | { type: "youtube"; videoId: string }
  | { type: "local"; src: string; poster?: string }

interface VideoPlayerProps {
  source: VideoSource
  title: string
  description: string
}

export function VideoPlayer({ source, title, description }: VideoPlayerProps) {
  const [open, setOpen] = useState(false)

  const thumbnailUrl =
    source.type === "youtube"
      ? `https://img.youtube.com/vi/${source.videoId}/maxresdefault.jpg`
      : source.poster ?? null

  return (
    <>
      <div
        className="glass-card rounded-lg overflow-hidden group cursor-pointer hover:border-white/25 hover:shadow-2xl transition-all duration-300 w-full"
        onClick={() => setOpen(true)}
      >
        <div className="aspect-video relative">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 group-hover:bg-black/70 transition-colors p-1">
              <PlayCircle className="w-14 h-14 text-white" />
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-white/10">
          <h3 className="font-medium text-sm md:text-base">{title}</h3>
          <p className="text-xs md:text-sm text-gray-400">{description}</p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-gray-800">
          <div className="aspect-video w-full relative">
            {open && source.type === "youtube" && (
              <iframe
                src={`https://www.youtube.com/embed/${source.videoId}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
            {open && source.type === "local" && (
              <video
                src={source.src}
                poster={source.poster}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
