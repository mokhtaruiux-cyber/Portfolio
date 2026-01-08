# Bugs & Fixes Tracker

## Fixed
- **[RE-FIXED] Hero Image Order**: Swapped the hero images to match the design request: `Pic-v1.png` for Dark mode and `Pic-v2-Dark.png` (the black background portrait) for Light mode.
- **[FIXED] Project Card Stacking**: Restored the premium stacking effect by aligning `sticky` positions and ensuring correct `zIndex` layering on the filtered project list.
- **[FIXED] Sticky Category Tabs**: Segmented tabs now remain pinned during project scroll and smoothly exit when the section ends.
- **[FIXED] Filter Integrity**: Restored 'All Projects' as the default selection and ensured every category (Apps, Design Systems, etc.) has active content.
- **[FIXED] Navbar Canvas Alignment**: Nav pill and mobile menu now use container-consistent gutters (`px-4 sm:px-6 lg:px-10`) to prevent edge overflow and keep alignment with sections.
- **[FIXED] Hero CTA Centering**: Hero spacing is normalized and CTA group width reduced so both buttons stay centered with equal left/right padding.
- **[FIXED] Featured Works Scroll Fidelity**: Added bottom buffer and adjusted sticky offsets in stacked cards so the scroll stacking behavior mirrors the web reference.
- **[RE-FIXED] Mobile Nav Width**: Nav container now overrides the global max-width on small screens so the pill spans the full viewport width while keeping desktop constraints.

## Performance Notes
- Applied `transform-gpu` to stacking card containers to maintain 60FPS during overlapping scroll animations.
- Verified `AnimatePresence` orchestration to prevent layout shifts during category switching.
