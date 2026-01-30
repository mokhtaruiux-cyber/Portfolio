# Assets & Image Management

## Hero Images
- `public/assets/images/Pic-v1.webp` — Light mode portrait
- `public/assets/images/Pic-v2-Dark.webp` — Dark mode portrait

Source mapping (current): `content.ts`
```
hero.image.lightSrc = assetPath('assets/images/Pic-v1.webp')
hero.image.darkSrc  = assetPath('assets/images/Pic-v2-Dark.webp')
```

## Optimization Guide
- Prefer **WebP** for photos and illustrations.
- Portraits should be ~800x800px to balance quality and load time.
- Use explicit `width`/`height` and `sizes` on images in components.

## Project & Blog Images
- Stored in `public/assets/images/` and referenced via `assetPath('assets/images/<file>')`.
- Some files retain “unsplash-*” names but are local assets, not remote URLs.

## Known Issues / TODO
- Experience logos are placeholders; replace with actual brand assets when available.
