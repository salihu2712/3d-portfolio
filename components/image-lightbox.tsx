"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useInView } from "@/hooks/use-in-view";

interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  colSpan?: string;
  rowSpan?: string;
  aspectRatio?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  gridClassName?: string;
  textOverlay?: boolean;
}

export function ImageLightbox({
  images,
  gridClassName,
  textOverlay,
}: ImageLightboxProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <>
      <div
        ref={gridRef}
        className={
          gridClassName ??
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }
      >
        {images.map((img, index) => (
          <div
            key={img.src}
            className={`glass-card rounded-lg overflow-hidden group hover:border-white/25 hover:shadow-2xl transition-all duration-300 cursor-pointer stagger-item ${img.colSpan ?? ""} ${img.rowSpan ?? ""} ${gridInView ? "stagger-visible" : ""}`}
            style={{ "--stagger-delay": `${index * 70}ms` } as React.CSSProperties}
            onClick={() => setSelected(img.src)}
          >
            <div className={`relative ${img.aspectRatio ?? "aspect-4/5"}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {textOverlay && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4">
                  <h3 className="font-medium text-white">{img.title}</h3>
                  <p className="text-sm text-white/80">{img.description}</p>
                </div>
              )}
            </div>
            {!textOverlay && (
              <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                <h3 className="font-medium">{img.title}</h3>
                <p className="text-sm text-gray-400">{img.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <div className="relative w-full max-h-[80vh] flex items-center justify-center">
            {selected && (
              <Image
                src={selected}
                alt="Product view"
                width={1200}
                height={900}
                className="object-contain max-h-[80vh] rounded-lg"
              />
            )}
            <DialogClose className="absolute top-2 right-2 bg-black/60 rounded-full p-2 hover:bg-black/80">
              <X className="h-6 w-6" />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
