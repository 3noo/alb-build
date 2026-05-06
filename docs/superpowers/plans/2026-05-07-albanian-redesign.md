# Albanian Language + Richer UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate the entire Alb-Build site to Albanian and enrich it with scroll-triggered animations, a counter animation on stats, word-by-word hero headline, a new "Përse Alb-Build" value section, richer card hover states, and a scroll indicator.

**Architecture:** All content strings live in `src/lib/site-content.ts` — translate there first, then update pages. A new `src/components/scroll-animations.tsx` client component installs one global IntersectionObserver for scroll-triggered reveals and counter animations. Pages and CSS are updated independently with no shared runtime state.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, lucide-react, vanilla CSS (globals.css), IntersectionObserver API.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/lib/site-content.ts` | Modify | All Albanian content strings |
| `src/app/globals.css` | Modify | New keyframes, scroll-trigger classes, card hover styles, bounce animation |
| `src/components/scroll-animations.tsx` | Create | Client component: IntersectionObserver for `[data-animate]` and `[data-count]` elements |
| `src/app/layout.tsx` | Modify | Mount `<ScrollAnimations />` globally |
| `src/components/site-header.tsx` | Modify | Albanian nav labels |
| `src/components/site-footer.tsx` | Modify | Albanian footer text |
| `src/app/page.tsx` | Modify | Full Albanian home page: word-by-word hero, new sections, scroll indicator |
| `src/app/portfolio/page.tsx` | Modify | Albanian portfolio page |
| `src/app/contact/page.tsx` | Modify | Albanian contact page |
| `src/app/services/page.tsx` | Modify | Albanian services page |

---

### Task 1: Translate all content strings to Albanian

**Files:**
- Modify: `src/lib/site-content.ts`

- [ ] **Step 1: Replace the entire file content**

```typescript
export const services = [
  "Projektim strukturor",
  "Fabrikim çeliku",
  "Magazina industriale",
  "Objekte logjistike",
  "Çati me panele sandwich",
  "Shkallë dhe tendë metalike",
  "Forcim rinovimi",
  "Punime metalike të brendshme dhe të jashtme"
];

export const capabilities = [
  "Matje në kantier dhe studim teknik",
  "Koordinim koncepti statik me inxhinierë",
  "Vizatime punëtorie dhe lista fabrikimi",
  "Primer, bojë dhe trajtim anti-korroziv",
  "Montim çeliku me bulona dhe saldim",
  "Çati, grykë, kullim dhe panele muri",
  "Shkallë sigurie, platforma dhe kangjella",
  "Riparim, forcim dhe zgjerime"
];

export const materials = [
  "Profile të rrotulluara të nxehta",
  "Seksione kuti dhe tub",
  "Panele çatie sandwich",
  "Panele muri fasadë",
  "Fletë metalike të galvanizuara",
  "Ankura dhe pllaka bazë"
];

export const quoteChecklist = [
  "Vendndodhja e kantierit dhe aksesi",
  "Dimensionet e përafërta të ndërtesës",
  "Foto, skica ose vizatime ekzistuese",
  "Qëllimi i strukturës",
  "Afati i preferuar",
  "Kërkesa për çati, fasadë ose kullim"
];

export const deliveryStandards = [
  "Vizatimet e punëtorisë kontrollohen para fabrikimit",
  "Elementet e çelikut shënohen për sekuencën e kantierit",
  "Sistemi primer ose bojë dakordohet para prodhimit",
  "Ankurat, pllakat, bulonat dhe aksesorët listohen",
  "Detajet e kullimit dhe panelit të çatisë rishikohen",
  "Korrigjimet finale të kantierit bëhen para dorëzimit"
];

export const serviceDetails: Record<string, string> = {
  "Projektim strukturor": "Kërkesat e ngarkesës, hapësirat, pikat e ankorimit dhe seksionet praktike të çelikut koordinohen para vizatimeve të punëtorisë.",
  "Fabrikim çeliku": "Prerja, saldimi, shpimi, përgatitja e sipërfaqes dhe shënimi i elementeve trajtohen në një sekuencë të kontrolluar punëtorie.",
  "Magazina industriale": "Kornizat me hapësirë të lirë, strukturat e çatisë, panelet e murit, dyert, kullimi dhe montimi i kantierit planifikohen së bashku.",
  "Objekte logjistike": "Tendat, zonat e ngarkimit, skajet e platformës, kangjellat mbrojtëse dhe detajet e çelikut të qëndrueshëm për përdorim të rëndë ditor.",
  "Çati me panele sandwich": "Pjerrësia e çatisë, grykët, detajet e mbivendosjes, vidhat, mbrojtëset dhe detajet e papërshkueshmërisë kontrollohen para instalimit.",
  "Shkallë dhe tendë metalike": "Shkallë, platforma, kangjella, struktura aksesi, mbulesa hyrje dhe detaje të saldimit të personalizuara.",
  "Forcim rinovimi": "Riparime të matura, trara të shtuar, forcim kolonash, mbështetje çatie dhe ndërhyrje e sigurt në ndërtesa ekzistuese.",
  "Punime metalike të brendshme dhe të jashtme": "Kangjella, porta, korniza, ndarëse, platforma shërbimi dhe detaje metalike të ekspozuara."
};

export const contactResponse = [
  "Përgjigje fillestare pas rishikimit të informacionit të kantierit",
  "Vizitë kantieri ose takim matjesh nëse nevojitet",
  "Fushëveprimi praktik, materialet dhe afati i përafërt",
  "Kuotim pas qartësimit të dimensioneve dhe detajeve"
];

export const contact = {
  phone: "+355 69 000 0000",
  email: "info@albbuild.al",
  location: "Tiranë, Shqipëri",
  hours: "Hën-Sht 08:00-18:00"
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing ones unrelated to this file).

- [ ] **Step 3: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/lib/site-content.ts
git commit -m "feat: translate all site content strings to Albanian"
```

---

### Task 2: Add CSS — new keyframes, scroll-trigger classes, card styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append new CSS rules at the end of globals.css (before the final `@media` blocks)**

Add these rules before the `@media (prefers-reduced-motion: reduce)` block:

```css
/* Scroll-triggered animation base state */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

[data-animate].in-view {
  opacity: 1;
  transform: translateY(0);
}

[data-animate][data-delay="100"] { transition-delay: 100ms; }
[data-animate][data-delay="200"] { transition-delay: 200ms; }
[data-animate][data-delay="300"] { transition-delay: 300ms; }
[data-animate][data-delay="400"] { transition-delay: 400ms; }
[data-animate][data-delay="500"] { transition-delay: 500ms; }

/* Word-by-word hero headline */
.hero-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: word-rise 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes word-rise {
  to { opacity: 1; transform: translateY(0); }
}

/* Scroll indicator bounce */
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  animation: bounce 2s ease-in-out infinite;
  cursor: default;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

/* Richer card hover — left border accent */
.card-hover {
  border-left: 3px solid transparent;
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.card-hover:hover {
  border-left-color: var(--ink);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Value pillars 2×2 grid */
.value-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.value-grid article {
  background: white;
  border: 1px solid var(--line);
  padding: 28px;
}

.value-grid h3 {
  font-size: 18px;
  margin: 12px 0 8px;
}

/* Project card image overlay */
.project-overlay {
  position: relative;
  overflow: hidden;
}

.project-overlay img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transition: transform 420ms ease;
}

.project-overlay:hover img {
  transform: scale(1.04);
}

.project-overlay-label {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
  display: flex;
  align-items: flex-end;
  padding: 16px;
  opacity: 0;
  transition: opacity 300ms ease;
  color: white;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.project-overlay:hover .project-overlay-label {
  opacity: 1;
}

/* Proof bar counter */
.proof strong {
  font-size: clamp(28px, 3.5vw, 48px);
}
```

- [ ] **Step 2: Add mobile override for value-grid inside the existing `@media (max-width: 860px)` block**

Find the existing media query block that ends around line 1009 and add inside it:

```css
  .value-grid {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 3: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/app/globals.css
git commit -m "feat: add scroll-trigger, word-by-word, overlay, and card hover CSS"
```

---

### Task 3: Create ScrollAnimations client component

**Files:**
- Create: `src/components/scroll-animations.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    // Scroll-triggered reveals
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      revealObserver.observe(el);
    });

    // Counter animation
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? "0", 10);
          const suffix = el.dataset.suffix ?? "";
          const duration = 1200;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-count]").forEach((el) => {
      countObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount it in layout.tsx**

Open `src/app/layout.tsx`. Add the import and render `<ScrollAnimations />` inside `<body>` before `{children}`:

```tsx
import { ScrollAnimations } from "@/components/scroll-animations";

// inside <body>:
<ScrollAnimations />
{children}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/components/scroll-animations.tsx src/app/layout.tsx
git commit -m "feat: add scroll-trigger and counter IntersectionObserver component"
```

---

### Task 4: Update site header and footer to Albanian

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`

- [ ] **Step 1: Replace site-header.tsx**

```tsx
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <span><Phone size={14} /> {contact.phone}</span>
        <span><Mail size={14} /> {contact.email}</span>
        <span><MapPin size={14} /> {contact.location}</span>
        <span>{contact.hours}</span>
      </div>
      <nav className="nav">
        <Link href="/" className="brand">Alb Build</Link>
        <div className="nav-links">
          <Link href="/">Kreu</Link>
          <Link href="/portfolio">Portofoli</Link>
          <Link href="/services">Shërbimet</Link>
          <Link href="/contact">Kontakt</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>
    </>
  );
}
```

- [ ] **Step 2: Replace site-footer.tsx**

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contact } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer style={{
      background: "var(--ink)",
      color: "white",
      padding: "100px clamp(16px, 4vw, 46px) 40px",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: "-50%",
        right: "-10%",
        width: "60vw",
        height: "60vw",
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)",
        animation: "slow-zoom 15s ease-in-out infinite alternate"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 data-animate data-delay="100" style={{
          fontSize: "clamp(48px, 8vw, 120px)",
          margin: "0 0 60px",
          lineHeight: "0.9",
          letterSpacing: "-0.04em",
          fontWeight: 900
        }}>
          Ndërtojmë Bashkë.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          borderTop: "1px solid var(--steel)",
          paddingTop: "60px"
        }}>
          <div data-animate data-delay="100">
            <span className="eyebrow" style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>Kontakt</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
              <a href={`tel:${contact.phone.replaceAll(" ", "")}`} style={{ fontSize: "20px", fontWeight: "600", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--muted)"} onMouseOut={e => e.currentTarget.style.color = "white"}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`} style={{ fontSize: "20px", fontWeight: "600", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--muted)"} onMouseOut={e => e.currentTarget.style.color = "white"}>{contact.email}</a>
            </div>
          </div>

          <div data-animate data-delay="200">
            <span className="eyebrow" style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>Vendndodhja</span>
            <p style={{ marginTop: "24px", fontSize: "18px", lineHeight: "1.6", maxWidth: "200px" }}>{contact.location}</p>
          </div>

          <div data-animate data-delay="300">
            <Link href="/contact" className="button secondary light" style={{
              fontSize: "18px",
              padding: "18px 32px",
              borderRadius: "4px",
              display: "inline-flex",
              alignItems: "center"
            }}>
              Fillo një projekt <ArrowRight size={20} style={{ marginLeft: "8px" }} />
            </Link>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--steel)",
          marginTop: "80px",
          paddingTop: "32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
          color: "var(--muted)",
          fontSize: "13px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          <span>© {new Date().getFullYear()} Alb-Build Construction</span>
          <span>Ndërtuar për forcë</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/components/site-header.tsx src/components/site-footer.tsx
git commit -m "feat: translate header and footer to Albanian"
```

---

### Task 5: Rewrite home page (page.tsx) in Albanian with all new sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ArrowUpRight, ChevronDown, ChevronRight, Factory, HardHat, Hammer, MapPin, ShieldCheck, Star, TrendingUp, Truck, Wallet } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, serviceDetails, services } from "@/lib/site-content";
import { getProjects } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

const heroWords = "Ndërtojmë të ardhmen në çelik.".split(" ");

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Alb-Build Solutions</span>
            <h1 style={{ filter: "none" }}>
              {heroWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-word"
                  style={{ animationDelay: `${i * 80}ms`, marginRight: "0.28em" }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p style={{ animationDelay: "500ms" }} className="animate-fade">
              Projektuar për të zgjatur. Ndërtuar për të mbresëlënë. Nga magazina industriale deri te zgjerimet komplekse, i kthejmë planet tuaja në realitet të fortë.
            </p>
            <div className="hero-actions">
              <a className="button" href="/portfolio">
                Shiko Punën Tonë <ArrowUpRight size={18} />
              </a>
              <a className="button secondary light" href="/contact">
                Fillo një Projekt <ChevronRight size={18} />
              </a>
            </div>
          </div>
          <div className="scroll-indicator">
            <ChevronDown size={28} />
          </div>
        </section>

        {/* PROOF BAR */}
        <section className="proof">
          {[
            { value: 12, suffix: "+", label: "Vite Eksperience" },
            { value: 80, suffix: "+", label: "Projekte të Mëdha" },
            { value: 100, suffix: "%", label: "Fabrikim në Shtëpi" },
            { value: 1, suffix: "", label: "Ekip i Unifikuar" },
          ].map(({ value, suffix, label }) => (
            <div key={label} data-animate>
              <strong data-count={value} data-suffix={suffix}>0{suffix}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        {/* SPECIALTY */}
        <section className="section compact-section">
          <div className="info-grid">
            <article data-animate data-delay="100">
              <span className="eyebrow">Specializimi Ynë</span>
              <h2>Çelik industrial i inxhinieruar për kushte ekstreme.</h2>
              <p className="muted" style={{ marginTop: "16px" }}>
                Ne nuk ndërtojmë vetëm struktura; krijojmë ekosisteme industriale që rezistojnë ndaj kohës, operacioneve dhe motit.
              </p>
            </article>
            <article data-animate data-delay="200">
              <h3>Pikat Tona Kryesore</h3>
              <ul className="plain-list">
                {Object.keys(serviceDetails).slice(0, 4).map((title) => (
                  <li key={title} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ChevronRight size={14} className="muted" /> {title}
                  </li>
                ))}
              </ul>
            </article>
            <article data-animate data-delay="300">
              <h3>Kapacitetet Tona</h3>
              <ul className="plain-list">
                {capabilities.slice(0, 4).map((cap) => (
                  <li key={cap} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ShieldCheck size={14} className="muted" /> {cap}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        {featuredProjects.length > 0 && (
          <section className="section white compact-section">
            <div className="section-head" data-animate>
              <h2>Projektet e Zgjedhura</h2>
              <p>Zbuloni si i kemi kthyer vizionet industriale në realitete monumentale çeliku në të gjithë rajonin.</p>
            </div>
            <div className="project-grid">
              {featuredProjects.map((project, i) => (
                <a
                  href="/portfolio"
                  key={project.id}
                  className="project"
                  data-animate
                  data-delay={String((i + 1) * 100)}
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <div className="project-overlay">
                    <img src={project.coverImage} alt={project.title} />
                    <div className="project-overlay-label">Shiko →</div>
                  </div>
                  <div className="project-body">
                    <div className="meta">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="muted">{project.summary}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "12px", color: "var(--muted)", fontWeight: "bold", textTransform: "uppercase" }}>
                      <MapPin size={14} /> {project.location}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "36px" }} data-animate>
              <a className="button" href="/portfolio">Shiko të Gjitha Projektet</a>
            </div>
          </section>
        )}

        {/* HOW WE WORK */}
        <section className="section compact-section">
          <div className="section-head" data-animate>
            <h2>Si Punojmë Ne?</h2>
            <p>Një projekt pa surpriza kërkon precizion në çdo fazë. Ja si garantojmë zero befasi në kantier.</p>
          </div>
          <div className="home-detail">
            <article className="card-hover" data-animate data-delay="100" style={{ padding: "28px" }}>
              <HardHat size={32} color="var(--accent)" />
              <h3 style={{ marginTop: "16px" }}>Projektim</h3>
              <p className="muted">Matje të sakta të kantierit dhe vlerësime të thella strukturore sigurojnë që dizajni të përputhet me realitetin fizik.</p>
            </article>
            <article className="card-hover" data-animate data-delay="200" style={{ padding: "28px" }}>
              <Factory size={32} color="var(--accent)" />
              <h3 style={{ marginTop: "16px" }}>Prodhim</h3>
              <p className="muted">Në punëtorinë tonë të avancuar, çdo trar pritet, saldohet dhe paratrozohet me precizion për qëndrueshmëri maksimale.</p>
            </article>
            <article className="card-hover" data-animate data-delay="300" style={{ padding: "28px" }}>
              <Truck size={32} color="var(--accent)" />
              <h3 style={{ marginTop: "16px" }}>Montim</h3>
              <p className="muted">Ekipet tona të specializuara trajtojnë transportin, sekuencimin dhe montimin strukturor në kantier me efikasitet dhe siguri.</p>
            </article>
          </div>
        </section>

        {/* WHY ALB-BUILD — NEW */}
        <section className="section white compact-section">
          <div className="section-head" data-animate>
            <h2>Përse Alb-Build?</h2>
            <p>Katër arsye pse klientët industrialë zgjedhin ne për projektet e tyre kritike.</p>
          </div>
          <div className="value-grid">
            <article className="card-hover" data-animate data-delay="100" style={{ padding: "28px" }}>
              <ShieldCheck size={32} color="var(--accent)" />
              <h3>Korrektësia</h3>
              <p className="muted">Çdo projekt trajtohet me ndershmëri të plotë — nga kuotimi deri te dorëzimi final.</p>
            </article>
            <article className="card-hover" data-animate data-delay="200" style={{ padding: "28px" }}>
              <TrendingUp size={32} color="var(--accent)" />
              <h3>Eksperienca</h3>
              <p className="muted">Mbi 12 vite ndërtim industrial aktiv në tregun shqiptar dhe rajonal.</p>
            </article>
            <article className="card-hover" data-animate data-delay="300" style={{ padding: "28px" }}>
              <Wallet size={32} color="var(--accent)" />
              <h3>Çmimi Konkurrues</h3>
              <p className="muted">Cilësi e lartë e inxhinierisë me çmime të balancuara dhe transparente — pa kosto të fshehura.</p>
            </article>
            <article className="card-hover" data-animate data-delay="400" style={{ padding: "28px" }}>
              <Star size={32} color="var(--accent)" />
              <h3>Cilësia</h3>
              <p className="muted">Standardet tona të prodhimit dhe montimit garantojnë struktura që zgjasin dekada.</p>
            </article>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="section home-band">
          <div>
            <Hammer size={24} />
            <strong>Gati për projektin tuaj tjetër?</strong>
          </div>
          <p>Sillni tek ne planet, skicat ose idetë tuaja. Ne do të merremi me ngritjen, nga kuotimi fillestar deri te buloni i fundit.</p>
          <a className="button" href="/contact">Kërko një Kuotim</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/app/page.tsx
git commit -m "feat: rewrite home page in Albanian with word hero, new sections, scroll animations"
```

---

### Task 6: Translate portfolio page

**Files:**
- Modify: `src/app/portfolio/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ArrowRight, FolderCheck } from "lucide-react";
import { ProjectList } from "@/components/project-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProjects } from "@/lib/portfolio-store";
import { deliveryStandards } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <span className="eyebrow">Portofoli</span>
            <h1>Saktësi arkitektonike <br />në çelik industrial.</h1>
            <p>
              Një regjistër vizual i magazinave, objekteve të prodhimit, tendave dhe strukturave monumentale çeliku.
            </p>
          </div>
        </section>

        <section className="section white">
          <ProjectList projects={projects} />
        </section>

        <section className="section compact-section" style={{ background: "var(--ink)", color: "white" }}>
          <div className="section-head" data-animate style={{ borderBottomColor: "var(--steel-dark)" }}>
            <h2 style={{ color: "white" }}>Anatomia e Çdo Projekti</h2>
            <p style={{ color: "#a0a0a0" }}>Përtej ndikimit vizual, çdo listim nënkupton ekzekutim kompleks inxhinierik, logjistik dhe llogaridhënës.</p>
          </div>

          <div className="home-detail" style={{ gap: "16px", background: "transparent", marginTop: "32px" }}>
            {deliveryStandards.slice(0, 3).map((item, i) => (
              <article
                key={item}
                data-animate
                data-delay={String((i + 1) * 100)}
                style={{ background: "var(--steel-dark)", borderColor: "var(--steel)", border: "1px solid var(--steel)" }}
              >
                <FolderCheck size={28} color="white" />
                <h3 style={{ marginTop: "16px", color: "white", fontSize: "16px" }}>{item}</h3>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "42px" }} data-animate data-delay="400">
            <a className="button secondary light" href="/contact">Gati të ndërtoni? Le të flasim <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/app/portfolio/page.tsx
git commit -m "feat: translate portfolio page to Albanian"
```

---

### Task 7: Translate contact page

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contact, contactResponse, quoteChecklist } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <span className="eyebrow">Kontakt & Kërkesa</span>
            <h1>Le të ndërtojmë strukturën tuaj tjetër.</h1>
            <p>
              Dërgoni koordinatat, planet ose sfidat tuaja. Specializohemi në ofrimin e zgjidhjeve reale me shpejtësi dhe efikasitet.
            </p>
          </div>
        </section>

        <section className="section contact-grid" style={{ paddingTop: "74px", paddingBottom: "74px" }}>
          <div data-animate data-delay="100">
            <h2>Fillo një Dialog Projekti</h2>
            <p className="muted" style={{ maxWidth: "500px", marginBottom: "24px" }}>
              Për të siguruar vlerësime të shpejta, ju lutemi mblidhni sa më shumë nga informacioni i mëposhtëm:
            </p>

            <div className="home-detail" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px", background: "transparent" }}>
              {quoteChecklist.map((item, i) => (
                <article
                  key={item}
                  style={{ background: "white", padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: "12px", border: "1px solid var(--line)", borderLeft: "3px solid var(--ink)" }}
                  data-animate
                  data-delay={String((i % 3) * 100 + 100)}
                >
                  <ArrowRight size={16} color="var(--ink)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)", lineHeight: "1.4" }}>{item}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="contact-panel" data-animate data-delay="200" style={{ background: "var(--ink)", color: "white", borderRadius: "0px", overflow: "hidden", border: "none" }}>
            <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid var(--steel-dark)" }}>
              <h3 style={{ margin: 0, fontSize: "24px", color: "white" }}>Linjat Direkte</h3>
              <p style={{ color: "#a0a0a0", marginTop: "8px", fontSize: "14px" }}>Lidhuni drejtpërdrejt me departamentet tona të inxhinierisë dhe menaxhimit.</p>
            </div>

            <a href={`tel:${contact.phone.replaceAll(" ", "")}`} style={{ color: "white", borderColor: "var(--steel-dark)", padding: "20px 32px", fontSize: "16px" }} className="hover-highlight">
              <Phone size={20} style={{ opacity: 0.7 }} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} style={{ color: "white", borderColor: "var(--steel-dark)", padding: "20px 32px", fontSize: "16px" }} className="hover-highlight">
              <Mail size={20} style={{ opacity: 0.7 }} /> {contact.email}
            </a>
            <span style={{ color: "white", borderColor: "var(--steel-dark)", padding: "20px 32px", fontSize: "16px" }}>
              <MapPin size={20} style={{ opacity: 0.7 }} /> {contact.location}
            </span>
            <span style={{ color: "white", borderColor: "none", padding: "20px 32px", fontSize: "16px" }}>
              <Clock size={20} style={{ opacity: 0.7 }} /> {contact.hours}
            </span>
          </div>
        </section>

        <section className="section white compact-section">
          <div className="section-head" data-animate>
            <h2>Sekuenca e Mirëpritjes</h2>
            <p>Procesi ynë transparent siguron qartësi të plotë menjëherë pas kërkesës suaj.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", paddingTop: "20px" }}>
            {contactResponse.map((item, i) => (
              <article
                key={item}
                data-animate
                data-delay={String((i + 1) * 100)}
                style={{
                  background: "var(--paper)",
                  padding: "40px 32px",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)"
                }}
              >
                <span className="eyebrow" style={{ color: "var(--accent)", fontSize: "14px" }}>Faza 0{i + 1}</span>
                <h3 style={{ marginTop: "16px", fontSize: "18px", lineHeight: "1.5", fontWeight: "700" }}>{item}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-highlight:hover { background: var(--steel-dark); }
      `}} />
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/app/contact/page.tsx
git commit -m "feat: translate contact page to Albanian"
```

---

### Task 8: Translate services page

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
import { CheckCircle2, ChevronRight, DraftingCompass, MoveRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, deliveryStandards, materials, serviceDetails, services } from "@/lib/site-content";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <span className="eyebrow">Shërbimet</span>
            <h1>Inxhinieri. Fabrikim. <br/>Montim me Precizion.</h1>
            <p>
              Një gamë e fuqishme shërbimesh për klientë industrialë që mbështeten në dorëzim të pagabueshëm çeliku.
            </p>
          </div>
        </section>

        <section className="section compact-section white">
          <div className="info-grid">
            <article data-animate data-delay="100" style={{ border: "none", borderRight: "1px solid var(--line)" }}>
              <DraftingCompass size={28} style={{ marginBottom: "16px" }} />
              <h2>Mbulim i Plotë</h2>
              <p className="muted">Nga kornizat arkitekturore deri te grykët e fundit, trajtojmë llogaritjen, ndërtimin dhe korrigjimet me përsosmëri.</p>
            </article>
            <article data-animate data-delay="200" style={{ border: "none", borderRight: "1px solid var(--line)" }}>
              <h3>Kapacitetet Kryesore</h3>
              <ul className="plain-list">
                {capabilities.slice(0, 5).map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ChevronRight size={14} className="muted" /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article data-animate data-delay="300" style={{ border: "none" }}>
              <h3>Materialet Kryesore</h3>
              <ul className="plain-list">
                {materials.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ChevronRight size={14} className="muted" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-head" data-animate>
            <h2>Ekspertiza Jonë e Specializuar</h2>
            <p>Ekzekutojmë montazhe të rënda dhe theksime arkitektonike me të njëjtën dedikimin ndaj sigurisë dhe shkallës.</p>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article
                key={service}
                data-animate
                data-delay={String((index % 4) * 100 + 100)}
                style={{ transition: "all 0.2s ease" }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>{service}</h2>
                <p className="muted" style={{ margin: 0 }}>{serviceDetails[service]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section compact-section" style={{ background: "var(--ink)", color: "white" }}>
          <div className="section-head" data-animate style={{ borderBottomColor: "var(--steel-dark)" }}>
            <h2 style={{ color: "white" }}>Standardet e Dorëzimit</h2>
            <p style={{ color: "#a0a0a0" }}>Zero vonesa. Qartësi e plotë. Zbatojmë kontrolle rigoroze para-prodhimit për të mbajtur strukturat masive të rrjedhin pa probleme në kantier.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {deliveryStandards.map((item, i) => (
              <article
                key={item}
                data-animate
                data-delay={String((i % 3) * 100 + 100)}
                style={{
                  background: "var(--ink)",
                  border: "1px solid var(--steel)",
                  padding: "32px",
                  borderRadius: "12px",
                  transition: "transform 0.3s ease, border-color 0.3s ease"
                }}
              >
                <CheckCircle2 size={28} color="white" style={{ marginBottom: "16px" }} />
                <h3 style={{ color: "white", fontSize: "16px", lineHeight: "1.5" }}>{item}</h3>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "42px" }} data-animate data-delay="400">
            <a className="button" href="/contact">Keni nevojë për këto shërbime? <MoveRight size={16} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles across all changed files**

```bash
cd /home/no/Documents/alb-build && npx tsc --noEmit 2>&1 | head -40
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
cd /home/no/Documents/alb-build
git add src/app/services/page.tsx
git commit -m "feat: translate services page to Albanian"
```

---

### Task 9: Smoke test in browser

**Files:** none (verification only)

- [ ] **Step 1: Start dev server**

```bash
cd /home/no/Documents/alb-build && npm run dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify home page**

Check:
- Hero headline animates in word by word
- Bouncing scroll chevron visible at bottom of hero
- Stats bar shows numbers (may start at 0 and count up on scroll)
- "Si Punojmë Ne?" section cards lift and show left border on hover
- "Përse Alb-Build?" 2×2 grid is present with 4 value cards
- Featured projects have image overlay on hover
- All text is in Albanian

- [ ] **Step 3: Verify other pages**

- `/portfolio` — Albanian hero, dark section translated
- `/contact` — Albanian hero, checklist cards with left border, "Linjat Direkte" panel, "Sekuenca e Mirëpritjes"
- `/services` (shërbimet) — Albanian hero, service list, delivery standards translated
- Footer on all pages: "Ndërtojmë Bashkë." large headline, "Fillo një projekt" CTA

- [ ] **Step 4: Verify scroll animations**

Scroll down on home page — elements with `data-animate` should fade and rise in as they enter viewport (not all at once on page load).

- [ ] **Step 5: Final commit if any last fixes needed, then done**

```bash
cd /home/no/Documents/alb-build
git add -A
git commit -m "fix: any final polish from smoke test"
```
