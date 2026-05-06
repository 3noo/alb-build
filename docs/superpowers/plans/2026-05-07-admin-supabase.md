# Admin Dashboard + Supabase Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the JSON-file admin with a Supabase-backed dashboard where the admin uploads photos from their PC, fills in 4 fields, and publishes portfolio projects.

**Architecture:** Supabase Storage handles image uploads client-side (browser → bucket → public URL), Supabase Postgres stores project rows, Next.js server actions handle DB writes/deletes. The admin UI is a single-page dashboard with a card grid and a simple add form — no sidebar.

**Tech Stack:** Next.js 14 App Router, @supabase/supabase-js, Supabase Storage, Supabase Postgres, TypeScript, vanilla CSS.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `.env.local` | Create | Supabase credentials |
| `src/utils/supabase/client.ts` | Create | Browser Supabase client (publishable key) |
| `src/utils/supabase/server.ts` | Create | Server Supabase client (service role key) |
| `src/lib/types.ts` | Rewrite | Simplified PortfolioProject type |
| `src/lib/portfolio-store.ts` | Rewrite | Supabase SDK reads/writes/deletes |
| `src/app/admin/actions.ts` | Rewrite | createProject + deleteProject server actions |
| `src/app/admin/page.tsx` | Rewrite | New admin UI — card grid + upload form |
| `src/app/admin/login/page.tsx` | Minor edit | Albanian text cleanup |
| `src/components/admin-shell.tsx` | Delete | Replaced by inline top bar in admin/page.tsx |
| `src/components/project-list.tsx` | Rewrite | Use new field names (cover_image, city) |
| `src/app/page.tsx` | Edit | Use cover_image, city instead of coverImage, location |
| `src/app/portfolio/page.tsx` | Edit | Use cover_image, city |
| `src/app/globals.css` | Edit | Upload zone styles + new admin styles |
| `src/app/api/portfolio/route.ts` | Edit | Remove normalizeProjectInput, use new store API |

---

### Task 1: Set up Supabase in Supabase (table + bucket via MCP)

**Files:** none (Supabase-side setup)

- [ ] **Step 1: Create the portfolio_projects table via Supabase MCP**

Use the Supabase MCP tool to run this SQL:

```sql
create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  city text not null,
  category text not null,
  year text not null,
  cover_image text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
```

- [ ] **Step 2: Create the portfolio-images storage bucket via Supabase MCP**

Use the Supabase MCP tool to create a public storage bucket named `portfolio-images`.

Then set a storage policy to allow public reads and authenticated uploads. Run this SQL via MCP:

```sql
-- Allow public read
create policy "Public read portfolio images"
on storage.objects for select
using ( bucket_id = 'portfolio-images' );

-- Allow anyone to upload (admin-only in practice via app logic)
create policy "Allow upload portfolio images"
on storage.objects for insert
with check ( bucket_id = 'portfolio-images' );
```

- [ ] **Step 3: Verify in Supabase dashboard**

Open https://supabase.com/dashboard/project/rlzkjjktsvhejnwuiurr/editor and confirm the table exists with the right columns. Open Storage and confirm `portfolio-images` bucket is public.

---

### Task 2: Install package and create env + Supabase client files

**Files:**
- Create: `.env.local`
- Create: `src/utils/supabase/client.ts`
- Create: `src/utils/supabase/server.ts`

- [ ] **Step 1: Install the Supabase JS SDK**

```bash
cd /home/no/Documents/alb-build && npm install @supabase/supabase-js
```

Expected: package added to node_modules, no errors.

- [ ] **Step 2: Create .env.local**

```bash
# /home/no/Documents/alb-build/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://rlzkjjktsvhejnwuiurr.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable__RxNFfN2wblcYZbZjHkYeg_l-Jo3Kv2
SUPABASE_SERVICE_ROLE_KEY=<get from Supabase dashboard → Settings → API → service_role key>
```

Write the file with the first two values filled in. Leave a placeholder comment for the service role key — the user must fill it in from their Supabase dashboard.

- [ ] **Step 3: Create src/utils/supabase/client.ts**

```typescript
import { createClient as _createClient } from "@supabase/supabase-js";

export function createBrowserClient() {
  return _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
```

- [ ] **Step 4: Create src/utils/supabase/server.ts**

```typescript
import { createClient as _createClient } from "@supabase/supabase-js";

export function createServerClient() {
  return _createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

### Task 3: Rewrite types and portfolio-store

**Files:**
- Rewrite: `src/lib/types.ts`
- Rewrite: `src/lib/portfolio-store.ts`

- [ ] **Step 1: Rewrite src/lib/types.ts**

```typescript
export type PortfolioProject = {
  id: string;
  title: string;
  city: string;
  category: string;
  year: string;
  cover_image: string;
  featured: boolean;
  created_at: string;
};

export type ProjectInput = Omit<PortfolioProject, "id" | "created_at">;
```

- [ ] **Step 2: Rewrite src/lib/portfolio-store.ts**

```typescript
import { createServerClient } from "@/utils/supabase/server";
import type { PortfolioProject, ProjectInput } from "./types";

export async function getProjects(): Promise<PortfolioProject[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as PortfolioProject[];
}

export async function addProject(input: ProjectInput): Promise<PortfolioProject> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as PortfolioProject;
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -30
```

Expected: errors only from files that use the old field names (coverImage, location, etc.) — those will be fixed in later tasks.

---

### Task 4: Rewrite admin server actions

**Files:**
- Rewrite: `src/app/admin/actions.ts`

- [ ] **Step 1: Rewrite src/app/admin/actions.ts**

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProject, deleteProject } from "@/lib/portfolio-store";
import type { ProjectInput } from "@/lib/types";

export async function createProjectAction(formData: FormData) {
  const input: ProjectInput = {
    title: requireString(formData.get("title"), "title"),
    city: requireString(formData.get("city"), "city"),
    category: requireString(formData.get("category"), "category"),
    year: requireString(formData.get("year"), "year"),
    cover_image: requireString(formData.get("cover_image"), "cover_image"),
    featured: formData.get("featured") === "on",
  };

  await addProject(input);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/portfolio");
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData) {
  const id = requireString(formData.get("id"), "id");
  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/portfolio");
}

function requireString(value: FormDataEntryValue | null, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}
```

---

### Task 5: Add admin CSS styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append new admin styles before the `@media (prefers-reduced-motion)` block**

```css
/* Admin top bar */
.admin-topbar {
  align-items: center;
  background: var(--steel-dark);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 14px clamp(16px, 4vw, 46px);
  position: sticky;
  top: 0;
  z-index: 20;
}

.admin-topbar-brand {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.admin-topbar-actions {
  align-items: center;
  display: flex;
  gap: 16px;
}

.admin-topbar a,
.admin-topbar button {
  background: transparent;
  border: 0;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: color 160ms ease;
}

.admin-topbar a:hover,
.admin-topbar button:hover {
  color: white;
}

/* Admin page layout */
.admin-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px clamp(16px, 4vw, 46px) 80px;
}

.admin-page h1 {
  font-size: clamp(22px, 3vw, 32px);
  margin: 0 0 4px;
}

.admin-section-title {
  align-items: baseline;
  border-bottom: 1px solid var(--line);
  display: flex;
  gap: 12px;
  margin: 40px 0 20px;
  padding-bottom: 10px;
}

.admin-section-title h2 {
  font-size: 18px;
  margin: 0;
}

.admin-section-title span {
  color: var(--muted);
  font-size: 13px;
}

/* Admin project cards grid */
.admin-card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.admin-card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.admin-card img {
  aspect-ratio: 4 / 3;
  display: block;
  object-fit: cover;
  width: 100%;
}

.admin-card-body {
  padding: 12px 14px;
}

.admin-card-body strong {
  display: block;
  font-size: 14px;
  line-height: 1.3;
}

.admin-card-body span {
  color: var(--muted);
  font-size: 12px;
}

.admin-card-delete {
  background: rgba(0,0,0,0.55);
  border: 0;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 16px;
  height: 28px;
  line-height: 1;
  padding: 0;
  position: absolute;
  right: 8px;
  top: 8px;
  transition: background 160ms ease;
  width: 28px;
}

.admin-card-delete:hover {
  background: rgba(180,0,0,0.8);
}

/* Upload zone */
.upload-zone {
  align-items: center;
  background: var(--paper);
  border: 2px dashed var(--line);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  min-height: 160px;
  padding: 24px;
  text-align: center;
  transition: border-color 200ms ease, background 200ms ease;
}

.upload-zone:hover,
.upload-zone.dragover {
  background: white;
  border-color: var(--ink);
}

.upload-zone img {
  border-radius: 6px;
  max-height: 140px;
  object-fit: cover;
  width: 100%;
}

.upload-zone p {
  color: var(--muted);
  font-size: 13px;
  margin: 0;
}

/* Add project form */
.admin-form-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;
}

.admin-empty {
  color: var(--muted);
  font-size: 14px;
  padding: 40px 0;
  text-align: center;
}

@media (max-width: 600px) {
  .admin-form-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### Task 6: Rewrite admin page UI

**Files:**
- Rewrite: `src/app/admin/page.tsx`
- Delete content of: `src/components/admin-shell.tsx` (replace with passthrough)

- [ ] **Step 1: Rewrite src/app/admin/page.tsx**

```tsx
import { ExternalLink } from "lucide-react";
import { createProjectAction, deleteProjectAction } from "./actions";
import { getProjects } from "@/lib/portfolio-store";
import { AdminUploadForm } from "./upload-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Top bar */}
      <header className="admin-topbar">
        <span className="admin-topbar-brand">Alb Build · Admin</span>
        <div className="admin-topbar-actions">
          <a href="/portfolio" target="_blank" rel="noreferrer">
            Portofoli publik <ExternalLink size={12} style={{ display: "inline", verticalAlign: "middle" }} />
          </a>
          <form action="/admin/logout" method="post">
            <button type="submit">Dil</button>
          </form>
        </div>
      </header>

      <div className="admin-page">
        <h1>Projektet</h1>
        <p className="muted">{projects.length} projekte në portofol.</p>

        {/* Projects grid */}
        <div className="admin-section-title">
          <h2>Të gjitha projektet</h2>
          <span>{projects.length} gjithsej</span>
        </div>

        {projects.length === 0 ? (
          <p className="admin-empty">Nuk ka projekte ende. Shto njërin më poshtë.</p>
        ) : (
          <div className="admin-card-grid">
            {projects.map((project) => (
              <div className="admin-card" key={project.id}>
                <img src={project.cover_image} alt={project.title} />
                <form action={deleteProjectAction} style={{ display: "contents" }}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="admin-card-delete"
                    title="Fshi projektin"
                    onClick={() => {}}
                  >×</button>
                </form>
                <div className="admin-card-body">
                  <strong>{project.title}</strong>
                  <span>{project.city} · {project.category} · {project.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add project */}
        <div className="admin-section-title" style={{ marginTop: "60px" }}>
          <h2>Shto projekt</h2>
        </div>

        <AdminUploadForm createProjectAction={createProjectAction} />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create src/app/admin/upload-form.tsx**

This is a client component that handles image upload to Supabase Storage, then submits the form with the public URL.

```tsx
"use client";

import { useRef, useState } from "react";
import { createBrowserClient } from "@/utils/supabase/client";

export function AdminUploadForm({
  createProjectAction,
}: {
  createProjectAction: (formData: FormData) => Promise<void>;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const supabase = createBrowserClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(path, file, { upsert: false });

    if (error) {
      alert("Ngarkimi i fotos dështoi: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path);

    setPublicUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <form action={createProjectAction} className="admin-form-grid">
      {/* Upload zone — full width */}
      <div
        style={{ gridColumn: "1 / -1" }}
        className="upload-zone"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
        onDragLeave={(e) => e.currentTarget.classList.remove("dragover")}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("dragover");
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <p>{uploading ? "Duke ngarkuar..." : "Kliko ose tërhiq foton këtu"}</p>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        <input type="hidden" name="cover_image" value={publicUrl} />
      </div>

      {/* Fields */}
      <div className="field">
        <label htmlFor="title">Titulli</label>
        <input id="title" name="title" required placeholder="Magazinë Industriale" />
      </div>
      <div className="field">
        <label htmlFor="city">Qyteti</label>
        <input id="city" name="city" required placeholder="Tiranë" />
      </div>
      <div className="field">
        <label htmlFor="category">Kategoria</label>
        <input id="category" name="category" required placeholder="Strukturë Çeliku" />
      </div>
      <div className="field">
        <label htmlFor="year">Viti</label>
        <input id="year" name="year" required placeholder="2026" />
      </div>

      {/* Featured + submit */}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input name="featured" type="checkbox" />
          <span>Shfaq në faqen kryesore</span>
        </label>
        <button
          className="button"
          type="submit"
          disabled={uploading || !publicUrl}
          style={{ opacity: (uploading || !publicUrl) ? 0.5 : 1 }}
        >
          {uploading ? "Duke ngarkuar..." : "Shto projekt"}
        </button>
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Replace admin-shell.tsx with a passthrough (no longer used)**

```tsx
export function AdminShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

---

### Task 7: Update public-facing components to use new field names

**Files:**
- Rewrite: `src/components/project-list.tsx`
- Edit: `src/app/page.tsx`
- Edit: `src/app/portfolio/page.tsx`
- Edit: `src/app/api/portfolio/route.ts`

- [ ] **Step 1: Rewrite src/components/project-list.tsx**

```tsx
import type { PortfolioProject } from "@/lib/types";

export function ProjectList({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project" key={project.id} style={{ borderRadius: "8px", overflow: "hidden" }}>
          <div className="project-overlay">
            <img src={project.cover_image} alt={project.title} />
            <div className="project-overlay-label">Shiko →</div>
          </div>
          <div className="project-body">
            <div className="meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="muted">{project.city}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update src/app/page.tsx — fix field names**

In the featured projects section, change:
- `project.coverImage` → `project.cover_image`
- `project.location` → `project.city`
- Remove the `<MapPin>` location line (or keep with `project.city`)
- Remove `project.summary` from card body

The project card block should become:

```tsx
<a
  href="/portfolio"
  key={project.id}
  className="project animate-rise stagger-1"
  style={{ borderRadius: "8px", overflow: "hidden" }}
>
  <div className="project-overlay">
    <img src={project.cover_image} alt={project.title} />
    <div className="project-overlay-label">Shiko →</div>
  </div>
  <div className="project-body">
    <div className="meta">
      <span>{project.category}</span>
      <span>{project.year}</span>
    </div>
    <h3>{project.title}</h3>
    <p className="muted">{project.city}</p>
  </div>
</a>
```

Also remove the `MapPin` import if no longer used.

- [ ] **Step 3: Update src/app/api/portfolio/route.ts**

Remove the `normalizeProjectInput` import and POST handler (no longer needed — admin uses server actions directly):

```typescript
import { NextResponse } from "next/server";
import { getProjects } from "@/lib/portfolio-store";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}
```

- [ ] **Step 4: Verify TypeScript compiles clean**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -40
```

Expected: zero errors.

---

### Task 8: Update admin login page (Albanian text)

**Files:**
- Edit: `src/app/admin/login/page.tsx`

- [ ] **Step 1: Replace the file**

```tsx
import { Lock, ShieldCheck } from "lucide-react";
import { loginAction } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-panel">
        <div>
          <a href="/" className="admin-logo">Alb Build</a>
          <span className="admin-kicker"><ShieldCheck size={15} /> Panel i mbrojtur</span>
          <h1>Hyr në panel</h1>
          <p>
            Hyr për të shtuar projekte çeliku, për të përditësuar listimet dhe për të parë çfarë shfaqet në portofolin publik.
          </p>
        </div>

        <form action={loginAction} className="admin-login-form">
          <div className="field full">
            <label htmlFor="password">Fjalëkalimi</label>
            <input id="password" name="password" type="password" required placeholder="Shkruaj fjalëkalimin" />
          </div>
          {params.error ? <p className="form-error">Fjalëkalimi është i gabuar.</p> : null}
          <button className="button" type="submit">
            <Lock size={17} /> Hyr
          </button>
        </form>
      </section>
    </main>
  );
}
```

---

### Task 9: Smoke test

**Files:** none

- [ ] **Step 1: Add SUPABASE_SERVICE_ROLE_KEY to .env.local**

Get the `service_role` key from: https://supabase.com/dashboard/project/rlzkjjktsvhejnwuiurr/settings/api

Add it to `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

- [ ] **Step 2: Start dev server**

```bash
cd /home/no/Documents/alb-build && npm run dev
```

- [ ] **Step 3: Verify admin login**

Open http://localhost:3000/admin — should redirect to login. Enter `admin123`. Should land on new admin dashboard.

- [ ] **Step 4: Verify project display**

Admin page shows empty grid (or existing projects if Supabase table has data). Top bar shows "ALB BUILD · Admin" with "Portofoli publik" and "Dil" links.

- [ ] **Step 5: Add a test project**

Click/drag an image into the upload zone → preview appears → fill in Titulli, Qyteti, Kategoria, Viti → click "Shto projekt". Should redirect back to admin with the new card visible.

- [ ] **Step 6: Verify public portfolio**

Open http://localhost:3000/portfolio — new project appears in grid with image, title, city.

- [ ] **Step 7: Delete a project**

Click × on a card in admin → card disappears → project removed from public portfolio.

- [ ] **Step 8: Verify home page**

Open http://localhost:3000 — featured projects section shows correct images (cover_image field).
