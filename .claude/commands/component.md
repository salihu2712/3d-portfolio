You are generating a new React component for the CgSalih 3D portfolio.

## Component Rules

### File Location and Naming
- General components: `components/<kebab-case-name>.tsx`
- UI primitives (shadcn-style): `components/ui/<kebab-case-name>.tsx`
- Component name: PascalCase
- Export: named export — `export function ComponentName`

### Directive Decision
Based on the component description:
- Needs interactivity (onClick, useState, useEffect, useRef)? → `"use client"` as line 1
- Pure display / RSC-compatible? → No directive (preferred)
- Uses Three.js / R3F? → `"use client"` (always)
- Uses next-themes / browser APIs? → `"use client"`

### Standard Imports
- Lucide icons: `import { IconName } from "lucide-react"`
- Conditional classes: `import { cn } from "@/lib/utils"`
- shadcn components: `import { X } from "@/components/ui/x"`
- Next.js image: `import Image from "next/image"`
- Next.js link: `import Link from "next/link"`

### Design System
Background hierarchy:
- `bg-black` — page level
- `bg-gray-900` — elevated surfaces (forms, highlighted sections)
- `bg-gray-800` — cards, thumbnails, interactive surfaces

Accent:
- Gradient button: `bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white`
- Accent text: `text-pink-400`
- Hover accent: `hover:text-pink-400 transition-colors`
- Gradient text: `bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent`

Text:
- Primary: `text-white`
- Secondary: `text-gray-400`
- Tertiary: `text-gray-500`
- Small label: `text-xs text-gray-400`

### Card Anatomy (standard)
```jsx
<div className="bg-gray-800 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300">
  {/* media area */}
  <div className="p-4">
    <h3 className="font-medium">Title</h3>
    <p className="text-sm text-gray-400">Description</p>
  </div>
</div>
```

### Image with Hover Overlay (standard pattern)
```jsx
<div className="relative aspect-[4/5]">
  <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</div>
```

### Button Variants
- Primary CTA: `className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"`
- Secondary: `variant="outline"` with `className="border-gray-700 hover:bg-gray-800"`
- Ghost nav link: `className="hover:text-pink-400 transition-colors"`

### Available shadcn Components
Button, Card/CardHeader/CardContent/CardFooter, Dialog/DialogContent/DialogClose,
Sheet/SheetContent/SheetTrigger, Input, Textarea, Label, Badge, Separator,
Form/FormField/FormItem/FormLabel/FormControl/FormMessage, Skeleton, Tooltip,
ScrollArea, Tabs/TabsList/TabsTrigger/TabsContent, Avatar

### Responsive
Mobile-first. Always provide base (mobile) styles, then `md:` and `lg:` enhancements.
Breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px

### Prohibitions
- No `dark:` prefixes (site is always dark)
- No `text-primary` / `bg-primary` CSS variable tokens
- No arbitrary color values like `bg-[#EC4899]` — use `bg-pink-500`
- No inline styles

## Task
$ARGUMENTS

Generate the complete component file including:
1. All imports at the top
2. Props interface (with a brief JSDoc comment if non-obvious)
3. The component function with full JSX
4. Named export (inline on function declaration)

After the component, add a usage example:
```tsx
// Usage:
// <ComponentName prop1="value" prop2={value} />
```
