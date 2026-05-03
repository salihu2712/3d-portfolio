# CgSalih — 3D Animation & Motion Design Portfolio

Personal portfolio website for CgSalih, a 3D animator and motion designer. Built with Next.js 15, Three.js, and Tailwind CSS.

## Features

- Interactive 3D model viewer (Three.js / React Three Fiber)
- 3D animation showcase with GIF previews
- Product visualization gallery with lightbox
- Contact form powered by Resend
- Responsive mobile navigation

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **3D:** Three.js, @react-three/fiber, @react-three/drei
- **Styling:** Tailwind CSS, shadcn/ui
- **Email:** Resend
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install --legacy-peer-deps
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Get an API key at [resend.com](https://resend.com). The contact form will fail silently without it.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  actions/email.ts     # Server action for contact form
  page.tsx             # Main portfolio page
  layout.tsx           # Root layout
components/
  model-viewer.tsx     # Interactive 3D model (Three.js)
  contact-form.tsx     # Contact form with validation
  youtube-player.tsx   # Featured video section
  mobile-nav.tsx       # Mobile navigation drawer
  stats-card.tsx       # Services cards
  ui/                  # shadcn/ui components
public/
  models/camera.glb    # 3D model for the hero viewer
  images/              # Product renders and profile photo
```

## Admin Panel

The portfolio has a password-protected admin panel for editing content without touching code.

### Setup

Add `ADMIN_PASSWORD` to `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key_here
ADMIN_PASSWORD=your_chosen_password
```

### Accessing the Admin Panel

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin` on your live domain)
2. Enter the password set in `ADMIN_PASSWORD`
3. You will be redirected to the dashboard

Visiting `/admin` without a valid session redirects automatically to `/admin/login`.

### What You Can Edit

| Tab | Editable fields |
|-----|----------------|
| **Hero** | Headlines, subtitle, bio text, CTA button label |
| **Services** | Title, description, and image for each of the 4 service cards |
| **Videos** | Title, description, YouTube video ID (or switch to a local file path) |
| **Contact** | Email, phone number, location |
| **3D Model** | Upload a new `.glb` file to replace the hero model |

All changes are saved to `lib/site-content.json` and reflected on the homepage immediately. Uploaded images go to `public/images/products/` and models go to `public/models/`.

### Session

The login session lasts 7 days via an `httpOnly` cookie. Use the **Logout** button in the admin header to end the session early.

## Deploying to Vercel

### Environment Variables

Set these in the Vercel dashboard under **Project → Settings → Environment Variables**:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for the contact form email action. Get one at resend.com. |
| `ADMIN_PASSWORD` | Yes | Password to access the `/admin` panel. Choose something strong. |

**Steps:**

1. Go to [vercel.com](https://vercel.com) → your project → **Settings** → **Environment Variables**
2. For each variable, enter the **Name** and **Value**, select all three environments (**Production**, **Preview**, **Development**), then click **Save**
3. **Redeploy** the project after adding variables — existing deployments do not pick up new env vars automatically. Go to **Deployments** → click the three-dot menu on the latest deploy → **Redeploy**

**CLI alternative** (if you have the Vercel CLI installed):

```bash
vercel env add RESEND_API_KEY
vercel env add ADMIN_PASSWORD
```

Both commands will prompt for the value and ask which environments to apply it to.

> **Note:** Never commit `.env.local` to git — it is already in `.gitignore`. The Vercel dashboard is the only place production secrets should live.

## Notes

- The `--legacy-peer-deps` flag is needed during install due to peer dependency conflicts between some Radix UI packages and React 19.
- Images are hosted on Vercel Blob Storage for animated GIFs in the portfolio section.
- The hero 3D model auto-rotates; orbit controls are intentionally disabled.
- Local video files can be placed in `public/videos/` and referenced via the Videos tab in the admin panel.

