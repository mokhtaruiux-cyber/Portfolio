import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const MOBILE_MOTION_QUERY = '(max-width: 768px), (pointer: coarse), (hover: none)';

export const useMobileMotionGate = () => {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_MOTION_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(MOBILE_MOTION_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return prefersReduced || isMobile;
};
