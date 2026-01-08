# Assets & Image Management

## Hero Images
- `Pic-v1.png`: Dark mode profile picture (Riyadh studio style).
- `Pic-v2-Dark.png`: Light mode profile picture (High-key minimal style).

## Optimization Guide
- Use **WebP** format whenever possible for better performance.
- Profile pictures should be around **800x800px** to balance quality and load time.
- Hero images are currently served from the root directory.

## Unsplash Fallbacks
Project images are currently mapped to Unsplash URLs in `constants.tsx`. To replace them:
1. Upload your image to an `assets/` folder (standard) or keep in root.
2. Update the `image` field in `PROJECTS` array in `constants.tsx`.

## Known Issues (Fixed/Pending)
- **Company Logos**: Issues with visibility were reported. Adjusted opacity (0.6 base -> 1.0 hover) and removed aggressive grayscale filters to ensure they appear.
- **Experience Logos**: Using `picsum` placeholders currently. Need actual assets for Zain, Squadio, STIPS.
