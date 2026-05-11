'use client';

import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { smoothScroll } from '../../lib/motionTokens';

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frameId = 0;
    const raf = (time: number) => {
      lenisRef.current?.lenis?.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: smoothScroll.lerp,
        smoothWheel: true,
        syncTouch: false,
        syncTouchLerp: smoothScroll.syncTouchLerp,
        touchMultiplier: smoothScroll.touchMultiplier,
        wheelMultiplier: smoothScroll.wheelMultiplier,
        overscroll: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};
