import fs from "fs"
import path from "path"

export interface HeroContent {
  headline1: string
  headline2: string
  subtitle: string
  bio: string
  bioDetail: string
  ctaText: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  image: string
}

export interface FeaturedVideo {
  id: string
  type: "youtube" | "local"
  videoId?: string
  src?: string
  title: string
  description: string
}

export interface ContactContent {
  email: string
  phone: string
  location: string
}

export interface ModelConfig {
  path: string
  positionX: number
  positionY: number
  positionZ: number
  scale: number
  cameraZ: number
  cameraFov: number
}

export interface SiteContent {
  hero: HeroContent
  services: ServiceItem[]
  featuredVideos: FeaturedVideo[]
  contact: ContactContent
  model: ModelConfig
}

const CONTENT_PATH = path.join(process.cwd(), "lib/site-content.json")

export function getContent(): SiteContent {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8")
  return JSON.parse(raw) as SiteContent
}
