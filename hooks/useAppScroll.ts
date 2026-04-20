import { useCallback } from 'react';
import { useLenis } from 'lenis/react';

type ScrollTarget = number | string | HTMLElement;

type ScrollOptions = {
  immediate?: boolean;
  lock?: boolean;
  offset?: number;
};

export const useAppScroll = () => {
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target: ScrollTarget, options: ScrollOptions = {}) => {
      if (lenis) {
        lenis.scrollTo(target, {
          duration: options.immediate ? 0 : 1,
          immediate: options.immediate,
          lock: options.lock,
          offset: options.offset,
        });
        return;
      }

      if (typeof target === 'number') {
        window.scrollTo({ top: target, left: 0, behavior: options.immediate ? 'auto' : 'smooth' });
        return;
      }

      if (typeof target === 'string') {
        document.querySelector<HTMLElement>(target)?.scrollIntoView({
          behavior: options.immediate ? 'auto' : 'smooth',
          block: 'start',
        });
        return;
      }

      target.scrollIntoView({
        behavior: options.immediate ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [lenis]
  );

  const scrollToId = useCallback(
    (id: string, options: ScrollOptions = {}) => {
      const target = document.getElementById(id);
      if (!target) return;
      scrollTo(target, options);
    },
    [scrollTo]
  );

  return {
    lenis,
    scrollTo,
    scrollToId,
  };
};
