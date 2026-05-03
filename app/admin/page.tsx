"use client"

import { useEffect, useState, useTransition } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getContentAction, saveContentAction, uploadFileAction, logoutAction } from "@/app/actions/content"
import type { SiteContent, ServiceItem, FeaturedVideo } from "@/lib/content"
import { Loader2, Save, Upload, LogOut } from "lucide-react"
import { ModelViewer } from "@/components/model-viewer"

function Field({ label, name, value, onChange, multiline }: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const cls = "w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea rows={3} className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

function NumericField({ label, value, onChange, step = 0.1, min, max }: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  max?: number
}) {
  const cls = "w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400 uppercase tracking-wider">{label}</label>
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        className={cls}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  )
}

function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="flex justify-end pt-4 border-t border-gray-800">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-all"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Save changes
      </button>
    </div>
  )
}

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    getContentAction().then(setContent)
  }, [])

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  function save(patch: Partial<SiteContent>) {
    if (!content) return
    const next = { ...content, ...patch }
    startTransition(async () => {
      await saveContentAction(next)
      setContent(next)
      showToast("Saved!", true)
    })
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
              View site ↗
            </a>
            <form action={logoutAction}>
              <button type="submit" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg text-sm font-medium shadow-lg ${toast.ok ? "bg-green-950/90 text-green-400" : "bg-red-950/90 text-red-400"}`}>
          {toast.msg}
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="hero">
          <TabsList className="bg-gray-900 mb-8 flex-wrap h-auto gap-1">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="model">3D Model</TabsTrigger>
          </TabsList>

          {/* ── Hero ── */}
          <TabsContent value="hero">
            <HeroTab
              hero={content.hero}
              saving={isPending}
              onSave={(hero) => save({ hero })}
            />
          </TabsContent>

          {/* ── Services ── */}
          <TabsContent value="services">
            <ServicesTab
              services={content.services}
              saving={isPending}
              onSave={(services) => save({ services })}
              onToast={showToast}
            />
          </TabsContent>

          {/* ── Videos ── */}
          <TabsContent value="videos">
            <VideosTab
              videos={content.featuredVideos}
              saving={isPending}
              onSave={(featuredVideos) => save({ featuredVideos })}
            />
          </TabsContent>

          {/* ── Contact ── */}
          <TabsContent value="contact">
            <ContactTab
              contact={content.contact}
              saving={isPending}
              onSave={(contact) => save({ contact })}
            />
          </TabsContent>

          {/* ── 3D Model ── */}
          <TabsContent value="model">
            <ModelTab
              model={content.model}
              saving={isPending}
              onSave={(model) => save({ model })}
              onToast={showToast}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

// ── Sub-tabs ──────────────────────────────────────────────────────────────────

function HeroTab({ hero, saving, onSave }: {
  hero: SiteContent["hero"]
  saving: boolean
  onSave: (h: SiteContent["hero"]) => void
}) {
  const [local, setLocal] = useState(hero)
  const set = (k: keyof typeof local) => (v: string) => setLocal((p) => ({ ...p, [k]: v }))
  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Hero Section</h2>
      <Field label="Headline line 1" name="headline1" value={local.headline1} onChange={set("headline1")} />
      <Field label="Headline line 2" name="headline2" value={local.headline2} onChange={set("headline2")} />
      <Field label="Subtitle / label" name="subtitle" value={local.subtitle} onChange={set("subtitle")} />
      <Field label="CTA button text" name="ctaText" value={local.ctaText} onChange={set("ctaText")} />
      <Field label="Bio heading" name="bio" value={local.bio} onChange={set("bio")} multiline />
      <Field label="Bio body" name="bioDetail" value={local.bioDetail} onChange={set("bioDetail")} multiline />
      <SaveBar onSave={() => onSave(local)} saving={saving} />
    </div>
  )
}

function ServicesTab({ services, saving, onSave, onToast }: {
  services: ServiceItem[]
  saving: boolean
  onSave: (s: ServiceItem[]) => void
  onToast: (msg: string, ok: boolean) => void
}) {
  const [local, setLocal] = useState<ServiceItem[]>(services)
  const [uploading, setUploading] = useState<string | null>(null)

  function setField(id: string, k: keyof ServiceItem, v: string) {
    setLocal((prev) => prev.map((s) => (s.id === id ? { ...s, [k]: v } : s)))
  }

  async function handleImageUpload(id: string, file: File) {
    setUploading(id)
    const fd = new FormData()
    fd.set("file", file)
    try {
      const result = await uploadFileAction(fd, `images/products/${file.name}`)
      if (result.success) {
        setField(id, "image", result.path!)
        onToast("Image uploaded", true)
      }
    } catch {
      onToast("Upload failed", false)
    }
    setUploading(null)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {local.map((s) => (
          <div key={s.id} className="bg-gray-900 rounded-lg p-4 space-y-3">
            <Field label="Title" name="title" value={s.title} onChange={(v) => setField(s.id, "title", v)} />
            <Field label="Description" name="desc" value={s.description} onChange={(v) => setField(s.id, "description", v)} />
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Image</label>
              <div className="flex items-center gap-3">
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={s.title} className="w-16 h-16 object-cover rounded" />
                )}
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                  {uploading === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Replace image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(s.id, e.target.files[0])} />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SaveBar onSave={() => onSave(local)} saving={saving} />
    </div>
  )
}

function VideosTab({ videos, saving, onSave }: {
  videos: FeaturedVideo[]
  saving: boolean
  onSave: (v: FeaturedVideo[]) => void
}) {
  const [local, setLocal] = useState<FeaturedVideo[]>(videos)

  function setVideoField(id: string, k: keyof FeaturedVideo, v: string) {
    setLocal((prev) => prev.map((vid) => (vid.id === id ? { ...vid, [k]: v } : vid)))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Featured Videos</h2>
      <div className="space-y-4">
        {local.map((v) => (
          <div key={v.id} className="bg-gray-900 rounded-lg p-4 space-y-3">
            <Field label="Title" name="title" value={v.title} onChange={(val) => setVideoField(v.id, "title", val)} />
            <Field label="Description" name="desc" value={v.description} onChange={(val) => setVideoField(v.id, "description", val)} />
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Type</label>
              <select
                value={v.type}
                onChange={(e) => setVideoField(v.id, "type", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="youtube">YouTube</option>
                <option value="local">Local file</option>
              </select>
            </div>
            {v.type === "youtube" ? (
              <Field label="YouTube Video ID" name="videoId" value={v.videoId ?? ""} onChange={(val) => setVideoField(v.id, "videoId", val)} />
            ) : (
              <Field label="Local file path (e.g. /videos/showreel.mp4)" name="src" value={v.src ?? ""} onChange={(val) => setVideoField(v.id, "src", val)} />
            )}
          </div>
        ))}
      </div>
      <SaveBar onSave={() => onSave(local)} saving={saving} />
    </div>
  )
}

function ContactTab({ contact, saving, onSave }: {
  contact: SiteContent["contact"]
  saving: boolean
  onSave: (c: SiteContent["contact"]) => void
}) {
  const [local, setLocal] = useState(contact)
  const set = (k: keyof typeof local) => (v: string) => setLocal((p) => ({ ...p, [k]: v }))
  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-bold">Contact Info</h2>
      <Field label="Email" name="email" value={local.email} onChange={set("email")} />
      <Field label="Phone" name="phone" value={local.phone} onChange={set("phone")} />
      <Field label="Location" name="location" value={local.location} onChange={set("location")} />
      <SaveBar onSave={() => onSave(local)} saving={saving} />
    </div>
  )
}

function ModelTab({ model, saving, onSave, onToast }: {
  model: SiteContent["model"]
  saving: boolean
  onSave: (m: SiteContent["model"]) => void
  onToast: (msg: string, ok: boolean) => void
}) {
  const [local, setLocal] = useState(model)
  const [uploading, setUploading] = useState(false)
  const set = (k: keyof typeof local) => (v: number | string) => setLocal((p) => ({ ...p, [k]: v }))

  async function handleUpload(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.set("file", file)
    try {
      const result = await uploadFileAction(fd, `models/${file.name}`)
      if (result.success) {
        setLocal((p) => ({ ...p, path: result.path! }))
        onToast("Model uploaded", true)
      }
    } catch {
      onToast("Upload failed", false)
    }
    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">3D Model</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings column */}
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Model File</h3>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Current model path</label>
              <p className="text-sm font-mono text-gray-300">{local.path}</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-400 hover:text-white transition-colors w-fit">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Upload new .glb model
              <input
                type="file"
                accept=".glb,.gltf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
            </label>
            <p className="text-xs text-gray-500">Uploading will immediately replace the hero model.</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Position</h3>
            <div className="grid grid-cols-3 gap-3">
              <NumericField label="X" value={local.positionX} onChange={(v) => set("positionX")(v)} step={0.1} />
              <NumericField label="Y" value={local.positionY} onChange={(v) => set("positionY")(v)} step={0.1} />
              <NumericField label="Z" value={local.positionZ} onChange={(v) => set("positionZ")(v)} step={0.1} />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Scale</h3>
            <NumericField label="Scale" value={local.scale} onChange={(v) => set("scale")(v)} step={0.1} min={0.1} />
          </div>

          <div className="bg-gray-900 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Camera</h3>
            <NumericField label="Distance (Z)" value={local.cameraZ} onChange={(v) => set("cameraZ")(v)} step={0.5} min={1} />
            <NumericField label="Field of View" value={local.cameraFov} onChange={(v) => set("cameraFov")(v)} step={1} min={10} max={120} />
          </div>
        </div>

        {/* Preview column */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Live Preview</h3>
          <div
            key={`${local.cameraZ}-${local.cameraFov}-${local.path}`}
            className="h-[360px] bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
          >
            <ModelViewer
              modelPath={local.path}
              position={[local.positionX, local.positionY, local.positionZ]}
              scale={local.scale}
              cameraZ={local.cameraZ}
              cameraFov={local.cameraFov}
            />
          </div>
          <p className="text-xs text-gray-500">Preview updates position and scale live. Camera changes remount the canvas.</p>
        </div>
      </div>

      <SaveBar onSave={() => onSave(local)} saving={saving} />
    </div>
  )
}
