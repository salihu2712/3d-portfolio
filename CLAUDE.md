# CgSalih 3D Portfolio — Claude Code Context

## Project Identity
Portfolio for CgSalih (Salih Usaeed), a 3D motion designer based in Abuja, Nigeria.
Contact: salihusaeed2712@gmail.com | cgsalih.com
Social: @cgsalih on Instagram, X, YouTube

## Stack
- Next.js 16 App Router + TypeScript 5 + React 19
- Tailwind CSS 4.2.4 (CSS-based config in app/globals.css — no tailwind.config.ts)
- shadcn/ui (default style, cssVariables: true, baseColor: neutral) — 50 components in components/ui/
- Three.js + @react-three/fiber + @react-three/drei
- React Hook Form + Zod (for any form with validation)
- Resend (email via app/actions/email.ts server action)
- next-themes with defaultTheme="dark"
- lucide-react for icons
- Install command: `npm install --legacy-peer-deps` (React 19 peer dep conflicts)

## Design System

### Color Palette (memorize — used everywhere)
| Role | Tailwind class |
|------|---------------|
| Page background | `bg-black` |
| Card/thumbnail surface | `bg-gray-800` |
| Form/elevated surface | `bg-gray-900` |
| Input background | `bg-gray-800` |
| Input border | `border-gray-700` |
| Dividers | `border-gray-800` |
| Nav (sticky) | `bg-black/80 backdrop-blur-sm` |
| Primary text | `text-white` |
| Secondary text | `text-gray-400` |
| Tertiary text | `text-gray-500` |
| Hover text accent | `text-pink-400` |
| Accent gradient | `from-pink-500 to-violet-500` |
| Accent gradient hover | `from-pink-600 to-violet-600` |
| Feedback success | `bg-green-950/50 text-green-400` |
| Feedback error | `bg-red-950/50 text-red-400` |

### Custom Tailwind Colors (tailwind.config.ts)
```
pink: { 400: "#F472B6", 500: "#EC4899", 600: "#DB2777" }
violet: { 400: "#A78BFA", 500: "#8B5CF6", 600: "#7C3AED" }
```

### Typography Scale
- Page hero: `text-3xl md:text-5xl lg:text-6xl font-bold leading-tight`
- Section heading: `text-3xl font-bold`
- Sub-heading: `text-2xl font-bold`
- Card title: `font-medium` / `font-medium text-lg`
- Description: `text-sm text-gray-400` / `text-gray-400 text-sm md:text-base`
- Overline/label: `text-sm uppercase tracking-wider text-gray-400`
- Logo gradient text: `bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent`

### Layout Primitives
- Container: `container mx-auto px-4 md:px-6`
- Section: `py-16` (standard), `py-8 md:py-12` (compact)
- Section header: `space-y-2 mb-8` (left) / `space-y-2 mb-8 text-center` (centered)
- Card: `bg-gray-800 rounded-lg overflow-hidden`
- Hoverable card: `bg-gray-800 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300`
- Image hover overlay: `absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`

### Responsive Grid Patterns
- Services 4-col: `grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4`
- Portfolio 4-col: `grid grid-cols-2 md:grid-cols-4 gap-4`
- Media 3-col: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Two-col hero: `grid md:grid-cols-2 gap-8 items-center`

### Interaction Patterns
- Color transitions: `transition-colors` (not `transition-all`)
- Card hover: `hover:shadow-lg transition-all duration-300`
- Image zoom: `transition-transform duration-500 group-hover:scale-110`
- Overlay reveal: `opacity-0 group-hover:opacity-100 transition-opacity duration-300`
- Button gradient: `bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600`

## File Structure
```
app/
  actions/email.ts      # "use server" — sendContactEmail() → { success, message }
  globals.css           # Tailwind directives + CSS vars + animate-gradient keyframes
  layout.tsx            # Inter font, ThemeProvider (dark default), global Metadata
  page.tsx              # Entire SPA — sections: #About #services #portfolio #contact
components/
  contact-form.tsx      # mailto/Gmail link form (not using server action yet)
  mobile-nav.tsx        # Sheet-based drawer nav
  model-viewer.tsx      # Canvas + inner Model() + OrbitControls + Environment
  project-card.tsx      # Link > overflow-hidden card with Image fill
  project-slider.tsx    # Manual CSS transform slider + useMobile hook
  stats-card.tsx        # number + text + description props
  theme-provider.tsx    # next-themes wrapper
  youtube-player.tsx    # YouTubePlayer + FeaturedVideoSection (iframe embeds)
  ui/                   # shadcn/ui — 50 components, do not edit
hooks/
  use-mobile.tsx        # useMobile(breakpoint?) — window width listener
  use-toast.ts          # useToast() + toast() — shadcn toast system
lib/
  utils.ts              # cn(...inputs) — clsx + twMerge
public/
  models/camera.glb     # Hero 3D model
  images/products/      # Product renders (.webp, .jpeg, .png)
  images/profile-photo.jpeg
```

## Naming & Code Conventions
- Components: PascalCase named exports (`export function MyComponent`)
- `"use client"` on line 1 for: hooks, event handlers, browser APIs, Three.js, next-themes
- Props interface declared above function, not exported unless consumed externally
- Import order: react → next/* → @/ components → @/ lib/utils → external
- Alias: `@/` maps to project root (tsconfig paths)
- Image: always `next/image`; for `fill` layout wrap in `relative` div with explicit height
- Forms with validation: React Hook Form + Zod resolver + shadcn Form components
- Server actions: `"use server"` file, return `{ success: boolean, message: string }`

## 3D / R3F Conventions
- Canvas: `shadows` prop + `camera={{ position: [0, 0, 8], fov: 45 }}`
- Lighting: `ambientLight intensity={0.5}` + `spotLight` at `[10, 10, 10]`
- Inner component pattern: separate inner `function Model()` owns `useRef` + `useFrame`
- Models: `useGLTF` from @react-three/drei, inside `<Suspense fallback={null}>`
- Controls: `OrbitControls enablePan={false}` with polar angle clamps
- Environment: `preset="studio"` for neutral product lighting
- Models in: `public/models/*.glb`
- Idle animation: `rotation.y += 0.005` in `useFrame`

## Known Caveats
- `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` both true in next.config.mjs
- `images.unoptimized: true` — needed for Vercel Blob animated GIF URLs
- React 19 + some Radix UI packages require `--legacy-peer-deps` on install
- The contact form uses mailto links, NOT the Resend server action (TODO)

## Active TODOs (from README)
1. Admin panel to edit text, images, videos, and 3D model
2. Custom video player that expands in a Dialog and stops on close
3. Replace YouTube iframe embeds with local video files
4. Services section: upgrade to image+card format (currently StatsCard)
5. Hero 3D camera should be fixed (not orbitable)
