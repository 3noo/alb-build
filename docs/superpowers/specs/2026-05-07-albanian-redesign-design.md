# Alb-Build: Albanian Language + Richer UI Redesign

**Date:** 2026-05-07  
**Inspiration:** https://alsteel.al/  
**Constraint:** Keep existing color palette exactly as-is. No git commits.

---

## Language

All user-facing text translated to Albanian across every page and component.

- Nav: `Kreu / Portofoli / Shërbimet / Kontakt / Admin`
- Footer tagline: "Ndërtojmë Bashkë."
- Copyright: "© 2026 Alb-Build Construction · Ndërtuar për forcë"

## Files Changed

- `src/lib/site-content.ts` — all strings to Albanian
- `src/app/globals.css` — new animation keyframes, scroll-trigger classes, hover card styles
- `src/app/page.tsx` — full Albanian rewrite + new sections + word-by-word hero + scroll indicator
- `src/app/portfolio/page.tsx` — Albanian translation
- `src/app/contact/page.tsx` — Albanian translation
- `src/components/site-header.tsx` — Albanian nav labels
- `src/components/site-footer.tsx` — Albanian footer text
- `src/components/scroll-animations.tsx` — new IntersectionObserver component
- `src/app/layout.tsx` — mount ScrollAnimations
- `src/app/services/page.tsx` — Albanian services page
