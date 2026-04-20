import React, { useEffect, useRef } from 'react';
import { cancelFrame, frame } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';

import 'lenis/dist/lenis.css';

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => {
      lenisRef.current?.lenis?.raf(timestamp);
    };

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
        syncTouchLerp: 0.075,
        touchMultiplier: 2,
        wheelMultiplier: 1,
        overscroll: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};
