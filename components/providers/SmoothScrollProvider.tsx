"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { smoothScroll } from '../../lib/motion/motionTokens';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    let lenis: Lenis | null = null;
    let frameId = 0;

    function raf(time: number) {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    function stop() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      lenis?.stop();
    }

    function sync() {
      if (reducedMotion.matches || coarsePointer.matches) {
        stop();
        lenis?.destroy();
        lenis = null;
        return;
      }

      if (!lenis) {
        lenis = new Lenis({
          lerp: smoothScroll.lerp,
          wheelMultiplier: smoothScroll.wheelMultiplier,
          smoothWheel: true,
        });
      }

      if (document.visibilityState === 'hidden') {
        stop();
      } else if (!frameId) {
        lenis.start();
        frameId = requestAnimationFrame(raf);
      }
    }

    sync();
    reducedMotion.addEventListener('change', sync);
    coarsePointer.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      reducedMotion.removeEventListener('change', sync);
      coarsePointer.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      stop();
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
