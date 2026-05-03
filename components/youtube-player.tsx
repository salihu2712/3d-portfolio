"use client";

import { VideoPlayer } from "@/components/video-player";
import { useInView } from "@/hooks/use-in-view";

export function FeaturedVideoSection() {
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        className={`md:col-span-2 stagger-item ${gridInView ? "stagger-visible" : ""}`}
        style={{ "--stagger-delay": "0ms" } as React.CSSProperties}
      >
        <VideoPlayer
          source={{ type: "youtube", videoId: "RJScvkUMt-8" }}
          title="3D Product Animation Showreel"
          description="A collection of our best 3D product animations and visualizations"
        />
      </div>
      <div
        className={`md:col-span-1 stagger-item ${gridInView ? "stagger-visible" : ""}`}
        style={{ "--stagger-delay": "120ms" } as React.CSSProperties}
      >
        <VideoPlayer
          source={{ type: "youtube", videoId: "QZUP9k45EXk" }}
          title="3D Animation Demo"
          description="Showcase of advanced 3D modeling and animation techniques"
        />
      </div>
      <div
        className={`md:col-span-3 stagger-item ${gridInView ? "stagger-visible" : ""}`}
        style={{ "--stagger-delay": "240ms" } as React.CSSProperties}
      >
        <VideoPlayer
          source={{ type: "youtube", videoId: "KBtI8m3zzKw" }}
          title="3D Product Visualization Techniques"
          description="Advanced lighting and rendering techniques for photorealistic product visualization"
        />
      </div>
    </div>
  );
}
