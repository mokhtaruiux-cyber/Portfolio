
import { useScroll, useTransform, MotionValue } from 'motion/react';
import type { UseScrollOptions } from 'motion/react';

/**
 * Hook to create a parallax effect based on scroll position.
 * @param distance The amount in pixels to move
 * @param offset Range of scroll progress [start, end]
 */
export function useParallax(
  distance: number,
  offset: UseScrollOptions['offset'] = ['start end', 'end start']
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    offset
  });

  const restrainedDistance = distance * 0.22;
  return useTransform(scrollYProgress, [0, 1], [-restrainedDistance, restrainedDistance]);
}
