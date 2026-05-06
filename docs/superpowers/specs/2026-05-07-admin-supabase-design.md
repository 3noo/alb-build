# Admin Dashboard + Supabase Integration Design

**Date:** 2026-05-07

---

## Goal

Replace the current JSON-file-backed admin with a clean Supabase-backed dashboard. Admin can upload a photo from their PC, fill in 4 fields, and publish a portfolio project. UI is redesigned from scratch — no sidebar, card grid instead of table.

---

## Supabase Resources

### Table: `portfolio_projects`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | default gen_random_uuid() primary key |
| `title` | text | not null |
| `city` | text | not null |
| `category` | text | not null |
| `year` | text | not null |
| `cover_image` | text | public URL from Supabase Storage |
| `featured` | boolean | default false |
| `created_at` | timestamptz | default now() |

### Storage Bucket: `portfolio-images`
- Public bucket (images served via public URL)
- Accepts: image/jpeg, image/png, image/webp
- Created via Supabase MCP during implementation

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://rlzkjjktsvhejnwuiurr.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable__RxNFfN2wblcYZbZjHkYeg_l-Jo3Kv2
SUPABASE_SERVICE_ROLE_KEY=<from Supabase dashboard → Settings → API>
```

`.env.local` for dev. `SUPABASE_SERVICE_ROLE_KEY` used server-side only.

---

## Supabase Client Setup

Two clients:

- `src/utils/supabase/client.ts` — browser client using publishable key (for image upload from admin form)
- `src/utils/supabase/server.ts` — server client using service role key (for DB reads/writes in server actions)

---

## Image Upload Flow

1. Admin selects file in form → instant local preview via `URL.createObjectURL`
2. On submit: browser uploads file to `portfolio-images` bucket via **client-side** Supabase Storage upload (using publishable key)
3. Get back the public URL: `supabase.storage.from('portfolio-images').getPublicUrl(path)`
4. Server action receives the public URL + other fields → inserts row into `portfolio_projects`

No file passes through the Next.js server.

---

## Simplified Data Model

`PortfolioProject` type updated:

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

Old fields dropped: `client`, `area`, `scope`, `status`, `summary`, `location`, `coverImage` → renamed to `cover_image`.

---

## portfolio-store.ts

Rewritten to use `@supabase/supabase-js` directly:
- `getProjects()` → `supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false })`
- `addProject()` → `supabase.from('portfolio_projects').insert(input)`
- `deleteProject()` → `supabase.from('portfolio_projects').delete().eq('id', id)` (**new**)
- JSON file fallback removed (Supabase is now required)

---

## Admin UI

### Login page (`/admin/login`)
- Unchanged functionally
- Minor style cleanup: in Albanian ("Hyr në panel")

### Dashboard (`/admin`)

**Layout:** No sidebar. Full-width single column with a top bar.

**Top bar:** "ALB BUILD · Admin" left, "Portofoli publik ↗" + "Dil" right.

**Projects grid:** Same card style as public portfolio grid. Each card has a small ✕ delete button top-right. Clicking delete triggers a server action → removes from Supabase → revalidates.

**Add project form** (below grid, always visible):
- Big drag-or-click upload zone — shows image preview once selected
- 4 fields in 2-col grid: Titulli / Qyteti / Kategoria / Viti
- Featured toggle checkbox
- "Shto projekt" submit button

Form is a standard HTML form with a server action. Image upload happens client-side (JS) before form submit, public URL injected into a hidden input.

---

## Public Portfolio Pages

Updated to use `cover_image` instead of `coverImage`, `city` instead of `location`. `summary`, `scope`, `area`, `client`, `status` removed from display.

---

## Files Changed

| File | Action |
|------|--------|
| `src/utils/supabase/client.ts` | Create |
| `src/utils/supabase/server.ts` | Create |
| `src/lib/types.ts` | Rewrite — simplified type |
| `src/lib/portfolio-store.ts` | Rewrite — Supabase SDK |
| `src/app/admin/page.tsx` | Rewrite — new UI |
| `src/app/admin/actions.ts` | Rewrite — delete action added |
| `src/components/admin-shell.tsx` | Delete — replaced by inline top bar |
| `src/app/admin/login/page.tsx` | Minor cleanup |
| `src/app/page.tsx` | Update field names |
| `src/app/portfolio/page.tsx` | Update field names |
| `src/components/project-list.tsx` | Update field names |
| `src/app/globals.css` | Add upload zone + admin styles |
| `.env.local` | Create with Supabase credentials |
| `data/portfolio.json` | Keep for reference, no longer read |
