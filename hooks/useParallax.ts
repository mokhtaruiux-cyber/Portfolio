
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import type { ScrollOffset } from 'framer-motion';

/**
 * Hook to create a parallax effect based on scroll position.
 * @param distance The amount in pixels to move
 * @param offset Range of scroll progress [start, end]
 */
export function useParallax(distance: number, offset: ScrollOffset = ["start end", "end start"]): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    offset
  });

  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}
