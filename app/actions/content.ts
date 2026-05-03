"use server"

import fs from "fs/promises"
import path from "path"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { SiteContent } from "@/lib/content"

const CONTENT_PATH = path.join(process.cwd(), "lib/site-content.json")

async function assertAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login")
  }
}

export async function getContentAction(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, "utf-8")
  return JSON.parse(raw) as SiteContent
}

export async function saveContentAction(data: SiteContent) {
  await assertAdmin()
  await fs.writeFile(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8")
  return { success: true }
}

export async function uploadFileAction(formData: FormData, destRelative: string) {
  await assertAdmin()
  const file = formData.get("file") as File | null
  if (!file || file.size === 0) {
    return { success: false, message: "No file provided" }
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  const dest = path.join(process.cwd(), "public", destRelative)
  await fs.mkdir(path.dirname(dest), { recursive: true })
  await fs.writeFile(dest, buffer)
  return { success: true, path: `/${destRelative}` }
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set("admin_token", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    redirect("/admin")
  }
  redirect("/admin/login?error=1")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  redirect("/admin/login")
}
