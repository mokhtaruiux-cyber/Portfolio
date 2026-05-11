# Motion Audit — Mokhtar Portfolio
## GetBitBang-Quality Motion Upgrade

**Reference:** getbitbang.com — premium Framer-template scroll choreography  
**Goal:** Every section = 1 choreography unit. Title → body → cards/media → CTA in sequence. No static content.

---

## Current Status (after Phase 1 & 2 fixes)

### What was already fixed
| Fix | Status |
|-----|--------|
| `motionTokens.ts` — stagger 0.03→0.10, distance 14→28 | ✅ Done |
| `motionVariants.ts` — cardReveal animate: function→static | ✅ Done |
| `Reveal.tsx` — `'use client'`, clean staggerChildren | ✅ Done |
| `RevealSection.tsx` — `'use client'`, fixed opacity masking | ✅ Done |
| `Section.tsx` — default motion `"fade"` → `"lift"` | ✅ Done |
| `AboutSection.tsx` — removed double stagger container | ✅ Done |
| `HowIHelpSection.tsx` — removed broken nested motion.ul | ✅ Done |
| `BlogSection.tsx` — removed motion="fade" | ✅ Done |
| `Experience.tsx` — removed motion="fade" | ✅ Done |
| `CompaniesLogos.tsx` — removed motion="fade" | ✅ Done |
| `PortfolioApp.tsx` work section — removed motion="fade" | ✅ Done |

### What remains — the GetBitBang gap

The guide prescribes **section-as-choreography-unit**: one `motion.section` with `initial="hidden" whileInView="visible"` propagates animate state to ALL children via variant inheritance. Children use `variants={fadeUp}` (no `whileInView` of their own) — they respond only to the parent. This produces the premium stagger cascade: eyebrow → title → body → cards → CTA all flowing in sequence, 0.1s apart.

**Current architecture problem:** Each child element has its OWN `whileInView` trigger. They all fire simultaneously on scroll (since they're in the same section, they enter the viewport at the same time). This is why despite fixes, sections still don't feel choreographed — it's 5 independent animations firing at once, not 1 sequence.

**Fix:** Introduce `AnimatedSection` as the choreography root. Rewrite each section to pass variant state top-down.

---

## Framer-Style Section Animation Plan

### New Motion Architecture

```
AnimatedSection (whileInView once)
  └── motion.div variants={sectionContainer}  ← stagger orchestrator
        ├── motion.p  variants={fadeUp}        ← eyebrow  (0ms)
        ├── motion.h2 variants={fadeUp}        ← title    (+150ms)
        ├── motion.p  variants={fadeUp}        ← body     (+300ms)
        ├── motion.div variants={staggerContainer} ← cards parent
        │     ├── motion.div variants={scaleIn}  ← card 1  (+450ms)
        │     └── motion.div variants={scaleIn}  ← card 2  (+550ms)
        └── motion.div variants={fadeUp}       ← CTA      (+650ms)
```

### New Files to Create

| File | Purpose |
|------|---------|
| `lib/motion/variants.ts` | `fadeUp`, `scaleIn`, `fadeIn`, `sectionContainer`, `staggerContainer`, `staggerContainerTight` using expo easing `[0.16,1,0.3,1]` |
| `components/motion/AnimatedSection.tsx` | Section wrapper — one `whileInView` propagates to all children |
| `components/motion/FadeUp.tsx` | Drop-in `motion.div` with `fadeUp` variants, no own trigger |
| `components/motion/ScaleIn.tsx` | Drop-in `motion.div` with `scaleIn` variants for cards/media |

### Sections to Upgrade

| Section | Current Gap | Fix |
|---------|-------------|-----|
| **Hero** | `RevealSection disableTransform` + 4 separate `Reveal` children all fire at once | Wrap with `AnimatedSection animate=` (hero fires on mount, not scroll). Children use `FadeUp` |
| **CompaniesLogos** | SectionTitle + Reveal fire independently | `AnimatedSection` → `FadeUp` eyebrow/title + `ScaleIn` marquee |
| **About** | `Section RevealSection` outer + inner `Reveal`s fire independently | `AnimatedSection` → `FadeUp` title/body + `Reveal staggerChildren` cards |
| **HowIHelp** | `Section` + staggerContainer correct but outer Section RevealSection double-fires | `AnimatedSection` → `FadeUp` header + `staggerContainer ScaleIn` cards |
| **Process** | Same issue | `AnimatedSection` → `FadeUp` header + `staggerContainer ScaleIn` steps |
| **Experience** | `Section` + stagger correct but rows need `ScaleIn` not `contentReveal` | `AnimatedSection` → `FadeUp` header + `staggerContainer ScaleIn` rows |
| **Work/Projects** | `Section RevealSection` title area + StackedCards separate | `AnimatedSection` → `FadeUp` header + StackedCards |
| **Blog** | `Section` + separate BlurIn/Reveal/stagger | `AnimatedSection` → `FadeUp` header + `staggerContainer ScaleIn` cards |
| **Testimonials** | `RevealSection disableTransform` + `Reveal` rows independent | `AnimatedSection` → `FadeUp` header + `ScaleIn` rows |
| **CTA** | `Reveal preset="card"` card wrapper + inner reveals | `AnimatedSection` → full choreography inside card |
| **ProjectDetail** | Multiple `Section`s each with own animations — OK for multi-section | Keep staggerContainer + upgrade easing to expo |
| **BlogArticle** | Same — keep, upgrade easing |
| **BlogIndex** | PageIntro + stagger grid — good, upgrade easing |
| **404** | PageIntro + Reveals — good |

### Easing Upgrade (The Key to Premium Feel)
Current easing: `[0.22, 1, 0.36, 1]` — good but not expo  
GetBitBang easing: `[0.16, 1, 0.3, 1]` — expo deceleration, the premium signature  
Duration: slow from 0.58→**0.75s** for cards, **0.65s** for content  

---

## Implementation Steps

1. Create `lib/motion/variants.ts` — expo easing, `fadeUp`, `scaleIn`, `sectionContainer`, `staggerContainer`
2. Create `components/motion/AnimatedSection.tsx` — single `whileInView` choreography root
3. Create `components/motion/FadeUp.tsx` — variant-inheriting `motion.div`
4. Create `components/motion/ScaleIn.tsx` — variant-inheriting card wrapper
5. Upgrade `motionTokens.ts` easing to expo
6. Rewrite `Hero.tsx` — animate on mount, children inherit
7. Rewrite `AboutSection.tsx` — AnimatedSection choreography
8. Rewrite `HowIHelpSection.tsx` — AnimatedSection choreography
9. Rewrite `ProcessReelSection.tsx` — AnimatedSection choreography
10. Rewrite `Experience.tsx` — AnimatedSection choreography
11. Rewrite `CompaniesLogos.tsx` — AnimatedSection choreography
12. Rewrite `BlogSection.tsx` — AnimatedSection choreography
13. Rewrite `TestimonialsSection.tsx` — AnimatedSection choreography
14. Rewrite CTA section in PortfolioApp — AnimatedSection choreography
15. Verify build passes
16. Browser validate all sections
