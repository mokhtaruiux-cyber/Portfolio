# Portfolio Animation System

This document describes the animation language used in this portfolio so it can be applied consistently in another React portfolio repo.

The current implementation uses Motion 12 from `motion/react`, Lenis for smooth scrolling, Tailwind CSS 4 for styling, and CSS variables for theme tokens. Do not import from `framer-motion` in the target repo.

## Design Intent

The animation style is premium, slow enough to feel intentional, and restrained enough to keep the portfolio readable. The system is built around four ideas:

1. Reveal important text with a soft blur and upward movement.
2. Bring sections into view with simple fade-up motion.
3. Use spring-based hover movement for cards and buttons.
4. Add scroll-linked ambience through progress and subtle parallax.

Most movement uses `transform`, `opacity`, and `filter: blur(...)`. Avoid animating `width`, `height`, `top`, `left`, padding, or margins unless the interaction requires layout animation, such as an accordion.

## Motion Defaults

Use this easing curve for premium reveal animations:

```ts
const premiumEase = [0.22, 1, 0.36, 1];
```

Use these timing ranges:

```ts
const revealDuration = 0.65; // normal content
const titleDuration = 0.72; // word and title reveal
const heroDuration = 0.8; // first-viewport hero moments
const fastUiDuration = 0.22; // menu and accordion transitions
```

Use these spring settings:

```ts
const buttonSpring = { type: 'spring', stiffness: 360, damping: 24 };
const cardSpring = { type: 'spring', stiffness: 260, damping: 24 };
const softSpring = { stiffness: 120, damping: 28, mass: 0.4 };
```

## Required Accessibility Rules

Always use `useReducedMotion()` for reusable motion primitives. If reduced motion is active, avoid initial hidden states that could delay content.

```tsx
import { motion, useReducedMotion } from 'motion/react';

const reduceMotion = useReducedMotion();

<motion.div
  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
/>
```

Lenis should also be disabled for users who prefer reduced motion:

```ts
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  return;
}
```

## Effect 1: Fade-Up Section Reveal

Used by:

- `src/components/motion/FadeUp.tsx`
- `AboutSection`
- `ContactSection`
- Project detail content blocks

Purpose:

This is the default section reveal. It makes content feel placed and polished without distracting from the work.

Behavior:

- Initial state: hidden, 28px lower.
- Trigger: when the element enters the viewport.
- Final state: visible at natural position.
- Runs once per page load.
- Uses a small optional delay for sequencing.

Implementation:

```tsx
const variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

<motion.div
  initial={reduceMotion ? false : 'hidden'}
  whileInView="visible"
  viewport={{ once: true, amount: 0.22 }}
  variants={variants}
  transition={{ delay }}
>
  {children}
</motion.div>
```

When to use:

- Section intros.
- Images paired with text.
- Contact blocks.
- Case study content groups.

When not to use:

- Every tiny element in a dense section.
- Interactive controls that should be immediately usable.

## Effect 2: Blur Title Reveal

Used by:

- `src/components/motion/BlurReveal.tsx`
- `SectionHeader`
- Services, projects, blog, pricing, and FAQ headers

Purpose:

This is the signature premium typography effect. It gives section headings a Framer-template feel by revealing each word with blur removal, opacity, and slight vertical travel.

Behavior:

- Splits a title into words.
- Each word starts blurred, transparent, and 18px lower.
- Words reveal one after another with a short stagger.
- Supports muted words for visual hierarchy.

Implementation:

```tsx
<MotionTag
  aria-label={text}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.45 }}
>
  {words.map((word, index) => (
    <motion.span
      aria-hidden="true"
      variants={{
        hidden: reduceMotion ? { opacity: 1 } : {
          opacity: 0,
          y: 18,
          filter: 'blur(14px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.72,
            delay: index * 0.055,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {word}
    </motion.span>
  ))}
</MotionTag>
```

Important details:

- Put the full heading in `aria-label`.
- Mark individual animated words as `aria-hidden`.
- Use `flex flex-wrap` so titles remain responsive.
- Keep letter spacing at `0` or normal in the target repo. Do not use viewport-scaled font sizes for compact panels.

When to use:

- Main section headings.
- Important editorial titles.
- Case study page hero titles if the title is not too long.

When not to use:

- Long paragraphs.
- Buttons.
- Form labels.

## Effect 3: Hero Word Stagger

Used by:

- `src/components/sections/HeroSection.tsx`

Purpose:

The hero needs the strongest first impression. It uses the same blur reveal language as section headers, but with bigger travel, longer duration, and immediate mount animation instead of viewport animation.

Behavior:

- The hero label fades in first.
- The H1 words reveal one by one.
- Supporting paragraph follows after the headline begins.
- Buttons follow the paragraph.
- Preview media enters with a slight 3D correction.

Implementation pattern:

```tsx
<motion.h1 initial="hidden" animate="visible" aria-label={title}>
  {title.split(' ').map((word, index) => (
    <motion.span
      aria-hidden="true"
      variants={{
        hidden: { opacity: 0, y: 28, filter: 'blur(18px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            delay: index * 0.06,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {word}
    </motion.span>
  ))}
</motion.h1>
```

Supporting paragraph:

```tsx
<motion.p
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.45, duration: 0.65 }}
/>
```

Hero preview card:

```tsx
<motion.div
  initial={{ opacity: 0, y: 36, rotateX: 8 }}
  animate={{ opacity: 1, y: 0, rotateX: 0 }}
  transition={{ delay: 0.32, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
/>
```

Guidance for another repo:

- Only use this full stagger on the first viewport.
- Keep the headline short enough to avoid awkward word wrapping.
- If the target portfolio has a very long headline, animate by line or phrase rather than every word.

## Effect 4: Animated Route Transitions

Used by:

- `src/components/motion/PageTransition.tsx`
- `src/components/layout/AppLayout.tsx`

Purpose:

Routes should not hard cut. Each page fades and slides in with a slight blur so navigation feels like one continuous portfolio experience.

Behavior:

- New route starts slightly lower and blurred.
- New route animates into full opacity.
- Exiting route moves slightly up and fades.
- `AnimatePresence` uses `mode="wait"` so transitions do not overlap messily.

Implementation:

```tsx
<AnimatePresence mode="wait">
  <PageTransition key={location.pathname}>{children}</PageTransition>
</AnimatePresence>
```

```tsx
<motion.main
  initial={reduceMotion ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
  exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: 'blur(8px)' }}
  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.main>
```

Guidance:

- Key the transition by `location.pathname`, not by query string, unless query changes represent full page changes.
- Put scroll restoration inside the layout so every route begins at the right position.

## Effect 5: Scroll Progress

Used by:

- `src/components/motion/ScrollProgress.tsx`

Purpose:

A one-pixel progress bar adds a premium reading/navigation cue without adding UI bulk.

Behavior:

- Tracks page scroll progress.
- Uses a spring to smooth the value.
- Scales a fixed top bar from left to right.

Implementation:

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 120,
  damping: 28,
  mass: 0.4,
});

<motion.div
  className="fixed left-0 right-0 top-0 h-px origin-left bg-accent"
  style={{ scaleX }}
/>
```

Guidance:

- Use `scaleX`, not `width`.
- Keep it one or two pixels tall.
- Place it above the fixed header with a high z-index.

## Effect 6: Hero Background Parallax and Ambient Glow

Used by:

- `src/components/background/HeroBackground.tsx`

Purpose:

The first viewport feels cinematic because the background has depth. It moves and fades subtly as the user scrolls, while a blue glow pulses slowly.

Behavior:

- Uses global scroll progress.
- Maps early scroll progress to background `y`.
- Maps early scroll progress to background opacity.
- Adds a slow infinite scale and opacity pulse on the blue glow.

Implementation:

```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 0.22], [0, 120]);
const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.18]);

<motion.img style={{ y, opacity }} />

<motion.div
  animate={{ scale: [1, 1.08, 1], opacity: [0.32, 0.52, 0.32] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
/>
```

Guidance:

- The image must be absolutely positioned and object-fit cover.
- Put gradient overlays above the image so text remains readable.
- Keep parallax subtle. The page should feel deep, not slippery.
- If using a target ref for scroll offsets, make sure the container has `position: relative` or use global `useScroll()` as in this repo.

## Effect 7: Card Hover Lift

Used by:

- `src/components/cards/ProjectCard.tsx`
- `src/components/cards/ServiceCard.tsx`
- `src/components/cards/StatCard.tsx`

Purpose:

Cards should feel tactile. The hover state lifts the surface slightly without resizing it or moving neighboring content.

Project cards:

```tsx
<motion.article
  whileHover={{ y: -8 }}
  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
>
  ...
</motion.article>
```

Service cards:

```tsx
<motion.article
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ y: -6 }}
/>
```

Stat cards:

```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
/>
```

Guidance:

- Hover lift should be between `-4` and `-8` pixels.
- Do not animate card dimensions.
- Use image scale with CSS transition if needed, not Motion layout animation.
- On touch devices, the hover effect simply will not be central to the experience, which is fine.

## Effect 8: Button and Icon Micro-Interactions

Used by:

- `src/components/ui/Button.tsx`
- `src/components/ui/IconButton.tsx`

Purpose:

Buttons feel responsive without becoming playful. They lift slightly on hover and compress slightly on tap.

Button pattern:

```tsx
<motion.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
/>
```

Icon button pattern:

```tsx
<motion.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
/>
```

Guidance:

- Use lower travel for controls than cards.
- Keep keyboard focus states separate from hover states.
- Icon buttons should have `aria-label`.
- Tooltips can be CSS-only and should not be required to understand the action.

## Effect 9: FAQ Accordion

Used by:

- `src/components/sections/FaqSection.tsx`

Purpose:

FAQ answers expand without jumping the page abruptly. This is one of the few places where height animation is acceptable because the content itself changes layout.

Behavior:

- Closed state has height `0` and opacity `0`.
- Open state animates to `height: auto` and opacity `1`.
- Uses `AnimatePresence` so closing content animates out.

Implementation:

```tsx
<AnimatePresence initial={false}>
  {isOpen ? (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.24 }}
      className="overflow-hidden"
    >
      ...
    </motion.div>
  ) : null}
</AnimatePresence>
```

Guidance:

- Keep the duration under `0.3s`.
- Add `aria-expanded` to the trigger button.
- Rotate the chevron with CSS or Motion, but do not over-animate it.

## Effect 10: Mobile Menu Reveal

Used by:

- `src/components/layout/Header.tsx`

Purpose:

The mobile menu opens as a compact panel rather than appearing instantly.

Behavior:

- Menu animates opacity and height.
- Uses `AnimatePresence` for exit.
- Duration is fast at `0.22s`.

Implementation:

```tsx
<AnimatePresence>
  {open ? (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22 }}
    >
      ...
    </motion.div>
  ) : null}
</AnimatePresence>
```

Guidance:

- This is a UI utility transition, not a brand moment.
- Keep it faster than editorial section animations.
- Ensure links remain keyboard accessible.

## Effect 11: Lenis Smooth Scrolling

Used by:

- `src/hooks/useLenis.ts`
- `src/components/layout/AppLayout.tsx`

Purpose:

Lenis gives the whole portfolio smooth scroll pacing. Motion handles the animation, Lenis handles the scroll feel.

Implementation:

```ts
const lenis = new Lenis({
  duration: 1.12,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

let frame = 0;
const raf = (time: number) => {
  lenis.raf(time);
  frame = requestAnimationFrame(raf);
};

frame = requestAnimationFrame(raf);
```

Guidance:

- Initialize once at layout level.
- Destroy Lenis on cleanup.
- Disable it for reduced motion.
- Avoid CSS `scroll-behavior: smooth` when using Lenis.

## How to Apply This in Another Portfolio Repo

1. Install `motion` and import from `motion/react`.
2. Add the motion primitives first: `FadeUp`, `BlurReveal`, `PageTransition`, `ScrollProgress`.
3. Add Lenis at the root layout level.
4. Wrap route rendering in `AnimatePresence mode="wait"`.
5. Replace static section headings with `SectionHeader` using `BlurReveal`.
6. Wrap major section blocks in `FadeUp`.
7. Add hover spring motion to cards and buttons.
8. Add scroll progress and subtle hero background parallax.
9. Test reduced-motion behavior.
10. Run a browser pass on desktop and mobile and check the console.

## Recommended File Structure

```txt
src/
  components/
    background/
      HeroBackground.tsx
    motion/
      BlurReveal.tsx
      FadeUp.tsx
      PageTransition.tsx
      ScrollProgress.tsx
    ui/
      Button.tsx
      IconButton.tsx
      SectionHeader.tsx
    layout/
      AppLayout.tsx
  hooks/
    useLenis.ts
```

## Quality Checklist

Before considering the animation system complete in a new repo:

- All Motion imports come from `motion/react`.
- Reduced motion does not hide content.
- Scroll progress uses `scaleX`, not width.
- Reveals use `opacity`, `transform`, and limited blur.
- Cards and buttons use spring hover/tap states.
- Accordions and menus use short durations.
- No text overlaps during animation on mobile.
- Browser console has no animation warnings.
- Playwright screenshots are checked at desktop and mobile sizes.

## Current Source References

- Fade-up primitive: `src/components/motion/FadeUp.tsx`
- Blur title primitive: `src/components/motion/BlurReveal.tsx`
- Route transition: `src/components/motion/PageTransition.tsx`
- Scroll progress: `src/components/motion/ScrollProgress.tsx`
- Hero animation: `src/components/sections/HeroSection.tsx`
- Hero parallax: `src/components/background/HeroBackground.tsx`
- Card hover: `src/components/cards/ProjectCard.tsx`
- Button hover/tap: `src/components/ui/Button.tsx`
- FAQ accordion: `src/components/sections/FaqSection.tsx`
- Lenis setup: `src/hooks/useLenis.ts`
