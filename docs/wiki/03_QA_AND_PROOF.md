# QA & Proof Checklist

Status: Placeholder (referenced by system rules)

This document defines the minimum proof checks for UI/system changes. It exists to prevent regressions and to keep verification consistent across contributors.

## Minimum Checks
- `npm run build`
- `npm run preview -- --port 3000`
- Overflow check:
```js
({
  doc: [document.documentElement.scrollWidth, document.documentElement.clientWidth],
  body: [document.body.scrollWidth, document.body.clientWidth],
})
```
Expected: both pairs match.

## Responsive Verification
- Verify mobile, tablet, and desktop layout parity.
- Verify sticky/scroll-linked behavior in Safari/iPhone.

## Notes
- Expand this checklist with device-specific steps as needed.
