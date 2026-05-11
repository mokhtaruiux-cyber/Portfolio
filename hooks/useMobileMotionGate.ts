import { useEffect, useState } from 'react';

const MOBILE_MOTION_QUERY = '(max-width: 768px), (pointer: coarse), (hover: none)';

export const useMobileMotionGate = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return isMobile;
};
