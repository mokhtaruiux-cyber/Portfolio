# QA & Code Quality Report v2 — Animation & Performance Audit
**Date:** January 30, 2026  
**Project:** Mokhtar Portfolio  
**Focus:** Animation performance (desktop/mobile) and code quality optimization

---

## Executive Summary

This audit identifies animation patterns causing performance issues on desktop and mobile, plus code quality improvements for better runtime performance. Issues are categorized by priority and include code-level fixes.

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Animation | 1 | 3 | 4 | 2 |
| Code Quality | 0 | 2 | 3 | 1 |

---

## 1. Animation Issues

### 🔴 Critical

#### A1. TypingEffect creates excessive DOM nodes
**File:** [TypingEffect.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/motion/TypingEffect.tsx)  
**Issue:** Each character becomes a separate `motion.span`, creating 50+ animated elements per title.

```tsx
// Current: Creates N motion.span elements for N characters
{text.split('').map((letter, index) => (
    <motion.span key={index} ... />
))}
```

**Impact:** High memory usage and frame drops on mobile during hero load.

**Fix:** Use CSS animation or Framer Motion's `staggerChildren` variant on a container:
```tsx
// Recommended: Animate container, use CSS for stagger effect
<motion.span
  initial={{ clipPath: 'inset(0 100% 0 0)' }}
  animate={{ clipPath: 'inset(0 0% 0 0)' }}
  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
>
  {text}
</motion.span>
```

---

### 🟠 High Priority

#### A2. Navbar backdrop-blur on every scroll
**File:** [Navbar.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/layout/Navbar.tsx#L113)  
**Issue:** Glass styling with `backdrop-blur` is always applied, even during scroll.

```tsx
className="glass border shadow-xl" // line 111
```

**Impact:** Constant compositor work on mobile during scroll.

**Fix:** Reduce or remove backdrop-blur on mobile:
```tsx
className={cn(
  'glass border shadow-xl',
  'md:backdrop-blur-md backdrop-blur-none' // No blur on mobile
)}
```

---

#### A3. ScrollProgress always mounted
**File:** [ScrollProgress.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/motion/ScrollProgress.tsx)  
**Issue:** `useScroll` + `useSpring` runs continuously on every scroll frame, even when off-screen.

**Impact:** Unnecessary JS execution during scroll on all pages.

**Fix:** Add visibility gating or use CSS scroll-linked animations:
```css
/* Pure CSS alternative */
.scroll-progress {
  transform: scaleX(var(--scroll-progress));
}
```

---

#### A4. TiltCard computes on every mouse move
**File:** [TiltCard.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/motion/TiltCard.tsx#L45-55)  
**Issue:** `handleMouseMove` updates motion values on every pixel moved.

```tsx
const handleMouseMove = (e) => {
  // Runs on every mouse move event (~60/sec)
  x.set(mouseXPos / width - 0.5);
  y.set(mouseYPos / height - 0.5);
};
```

**Impact:** High CPU usage when hovering over multiple cards.

**Fix:** Throttle via `requestAnimationFrame`:
```tsx
const handleMouseMove = (e) => {
  if (rafId.current) return;
  rafId.current = requestAnimationFrame(() => {
    // ... update logic
    rafId.current = null;
  });
};
```

---

### 🟡 Medium Priority

#### A5. Blog cards use TiltCard on mobile
**File:** [BlogCard.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/blog/BlogCard.tsx#L20)  
**Issue:** `TiltCard` is used but already gates itself — however, the component is still rendered.

**Fix:** Skip wrapping entirely on mobile:
```tsx
const Wrapper = isMobile ? React.Fragment : TiltCard;
```

---

#### A6. ProcessReelSection progress animation runs always
**File:** [ProcessReelSection.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/ProcessReelSection.tsx#L54-83)  
**Issue:** `requestAnimationFrame` loop runs continuously when section is in view.

**Current behavior:** Good visibility gating exists, but no reduced-motion check in the animation loop.

**Fix:** Already uses `reduceMotion` for disabling — ✅ OK

---

#### A7. Testimonials creates 27 card elements
**File:** [TestimonialsSection.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/TestimonialsSection.tsx#L61)  
**Issue:** 3 rows × 3 items × 3 duplicates = 27 cards rendered.

**Fix:** Reduce duplicates on mobile (already partially addressed):
```tsx
const marqueeItems = isMobile 
  ? [...items, ...items]      // 18 cards
  : [...items, ...items, ...items]; // 27 cards
```

---

#### A8. CompaniesLogos tooltip uses AnimatePresence per item
**File:** [CompaniesLogos.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/CompaniesLogos.tsx#L84-100)  
**Issue:** Each logo has its own `AnimatePresence` wrapper for tooltip.

**Impact:** Minor — tooltips only appear on hover.

**Fix:** Consider a single shared tooltip positioned via portal.

---

### 🟢 Low Priority

#### A9. Multiple `useReducedMotion` calls
**Issue:** Many components call `useReducedMotion()` individually.

**Fix:** Create a centralized context or use existing `useMobileMotionGate()` consistently.

---

#### A10. Hero image has blur glow div
**File:** [Hero.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/Hero.tsx#L44-49)  
**Issue:** Static blur glow behind hero image.

```tsx
<div className="blur-[100px] opacity-30 scale-125" />
```

**Impact:** Low — static element, no animation.

**Status:** ✅ Acceptable (static blur is GPU-composited once)

---

## 2. Code Quality Issues

### 🟠 High Priority

#### C1. Scroll event listener without passive flag
**File:** [Navbar.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/layout/Navbar.tsx#L28-31)

```tsx
window.addEventListener('scroll', s);
```

**Fix:** Add passive option:
```tsx
window.addEventListener('scroll', s, { passive: true });
```

---

#### C2. Multiple resize listeners across components
**Files:** `StackedCards.tsx`, `TiltCard.tsx`, `CompaniesLogos.tsx`  
**Issue:** Each component adds its own `matchMedia` listener for breakpoint detection.

**Fix:** Create a shared `useMediaQuery` hook or use CSS media queries where possible.

---

### 🟡 Medium Priority

#### C3. Unused import in StackedCards
**File:** [StackedCards.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/motion/StackedCards.tsx#L4)

```tsx
import { stagger, viewportDefaults } from '../../lib/motionTokens'; // unused
```

---

#### C4. Re-renders from inline object styles
**Files:** Multiple  
**Issue:** Inline style objects like `style={{ width: 'fit-content' }}` create new object references each render.

**Fix:** Extract to constants or use `useMemo`:
```tsx
const marqueeStyle = useMemo(() => ({ width: 'fit-content' }), []);
```

---

#### C5. Type coercion in ProcessReelSection
**File:** [ProcessReelSection.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/ProcessReelSection.tsx#L39)

```tsx
const interactionTimeout = useRef<number | null>(null);
// Later: window.setTimeout returns NodeJS.Timeout in some envs
```

**Fix:** Use `ReturnType<typeof setTimeout>` for cross-environment safety.

---

### 🟢 Low Priority

#### C6. Console/debug statements
**Status:** None found — ✅ Clean

---

## 3. Summary Table

| ID | File | Issue | Priority | Effort |
|----|------|-------|----------|--------|
| A1 | TypingEffect.tsx | 50+ motion.span elements | 🔴 Critical | Medium |
| A2 | Navbar.tsx | backdrop-blur on mobile | 🟠 High | Low |
| A3 | ScrollProgress.tsx | Always-on scroll listener | 🟠 High | Medium |
| A4 | TiltCard.tsx | Unthrottled mousemove | 🟠 High | Low |
| A5 | BlogCard.tsx | TiltCard rendered on mobile | 🟡 Medium | Low |
| A7 | TestimonialsSection.tsx | 27 card DOM nodes | 🟡 Medium | Low |
| C1 | Navbar.tsx | Missing passive scroll | 🟠 High | Low |
| C2 | Multiple | Duplicate resize listeners | 🟠 High | Medium |
| C3 | StackedCards.tsx | Unused import | 🟡 Medium | Trivial |

---

## 4. Fixed in This Session

| Component | Fix Applied |
|-----------|-------------|
| [BlurIn.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/motion/BlurIn.tsx) | Skip blur filter on mobile |
| [LivingBackground.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/background/LivingBackground.tsx) | Static gradient on mobile |
| [HeroGlow.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/background/HeroGlow.tsx) | Static gradient on mobile |
| [CompaniesLogos.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/CompaniesLogos.tsx) | Fewer DOM nodes on mobile |
| [TestimonialsSection.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/TestimonialsSection.tsx) | Fixed transition handling |
| [ProcessReelSection.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/sections/ProcessReelSection.tsx) | Vertical stack on mobile |
| [StackedCards.tsx](file:///Users/mokhtar/Downloads/Mokhtar%20Portfolio%20Final/components/motion/StackedCards.tsx) | Fade+up animation on mobile |

---

## 5. Recommended Next Steps

1. **High-impact quick wins:**
   - Add `{ passive: true }` to scroll listeners (C1)
   - Throttle TiltCard mousemove (A4)
   - Remove Navbar backdrop-blur on mobile (A2)

2. **Medium effort:**
   - Refactor TypingEffect to CSS clip-path animation (A1)
   - Create shared `useMediaQuery` hook (C2)

3. **Testing:**
   - Run Lighthouse Performance audit on mobile
   - Profile with Chrome DevTools → Performance tab during scroll
