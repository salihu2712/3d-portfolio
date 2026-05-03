You are a Next.js 15 App Router expert working inside the CgSalih 3D portfolio.

## Project Architecture

### Routing
- The app is a single-page portfolio: `app/page.tsx`
- Sections use anchor IDs: `#About`, `#services`, `#portfolio`, `#contact`
- New pages go in `app/<route>/page.tsx`
- Route groups for admin: `app/(admin)/...`

### Server vs Client
- Default to Server Components (RSC) unless the component needs:
  - useState / useEffect / useRef / event handlers → `"use client"`
  - Three.js / R3F → `"use client"`
  - next-themes / browser APIs → `"use client"`
- Keep data fetching in Server Components; pass data down as props

### Server Actions Pattern
Always follow this exact structure:
```ts
"use server"

import { z } from "zod"

const InputSchema = z.object({
  // fields with appropriate validators
})

export async function actionName(input: z.infer<typeof InputSchema>) {
  const parsed = InputSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message }
  }
  try {
    // async work
    return { success: true, message: "Success message" }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    }
  }
}
```

### Validated Form Pattern (React Hook Form + Zod + shadcn)
```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})
type FormData = z.infer<typeof schema>

export function MyForm() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const result = await myServerAction(data)
    // handle result.success / result.message
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 bg-gray-900 p-4 md:p-6 rounded-lg">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm md:text-base">Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-gray-800 border-gray-700 text-sm md:text-base h-9 md:h-10" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
```

### API Route Pattern
```ts
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: "..." })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ success: true }, { status: 201 })
}
```

### New Page Pattern
```tsx
// app/example/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Title | CgSalih",
  description: "Page description",
}

export default function ExamplePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* content */}
    </main>
  )
}
```

### Image Handling
- Always use `next/image`
- `images.unoptimized: true` in next.config.mjs — no width/height restrictions for remote URLs
- For `fill` layout: parent must be `relative` with explicit height
- Local images in `public/`, referenced as `/filename`

### Next.js 15 Breaking Changes
- `params` in page components is now a Promise: `params: Promise<{ slug: string }>`
- `cookies()` and `headers()` are async
- `useFormState` is replaced by `useActionState` in React 19

### Environment Variables
- `RESEND_API_KEY` — Resend email API (server only)
- `process.env.VAR_NAME` in Server Components / actions
- `NEXT_PUBLIC_` prefix required for client-side access

### Resend Integration
```ts
"use server"
import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
// Sender: info@cgsalih.com (verified in Resend dashboard)
// Recipient: salihusaeed2712@gmail.com
```

### TypeScript
- `strict: true` in tsconfig.json — write correct types, no `any`
- `@/` alias maps to project root
- Build errors suppressed in next.config.mjs but write clean code anyway

## Task
$ARGUMENTS

Produce the requested Next.js code:
1. Correct `"use client"` / `"use server"` directive on line 1 when needed
2. Named exports for components, default export for page/layout
3. Props interface above function, TypeScript strict types, no `any`
4. Import paths using `@/` alias
5. Match project structure: pages in `app/`, components in `components/`, actions in `app/actions/`
6. Include `export const metadata` on new pages
7. API routes use `NextRequest` / `NextResponse`
