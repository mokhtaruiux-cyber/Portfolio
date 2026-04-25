import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { X } from 'lucide-react';

type ProjectViewerImage = {
  src: string;
  alt: string;
  id?: string;
};

type ProjectImageViewerProps = {
  images: ProjectViewerImage[];
  initialIndex: number;
  projectTitle: string;
  projectSubtitle: string;
  isOpen: boolean;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusable = (element: HTMLElement | null) => {
  if (!element) return [] as HTMLElement[];
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (node) => !node.hasAttribute('disabled') && node.getAttribute('aria-hidden') !== 'true'
  );
};

export const ProjectImageViewer: React.FC<ProjectImageViewerProps> = ({
  images,
  initialIndex,
  projectTitle,
  projectSubtitle,
  isOpen,
  onClose,
}) => {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const previousFocusedRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const safeInitialIndex = Math.max(0, Math.min(initialIndex, Math.max(images.length - 1, 0)));
  const [activeIndex, setActiveIndex] = useState(safeInitialIndex);

  useEffect(() => {
    itemRefs.current = Array.from({ length: images.length }, (_, index) => itemRefs.current[index] ?? null);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const original = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.position = original.position;
      body.style.top = original.top;
      body.style.width = original.width;
      body.style.overflow = original.overflow;
      body.style.paddingRight = original.paddingRight;
      if (lenis) {
        lenis.scrollTo(scrollY, { immediate: true });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
      previousFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const root = scrollRef.current;
        const target = itemRefs.current[safeInitialIndex];
        if (!root || !target) return;

        if (safeInitialIndex === 0) {
          root.scrollTo({ top: 0, behavior: 'auto' });
          return;
        }

        const rootRect = root.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const targetTop = targetRect.top - rootRect.top + root.scrollTop;
        const topOffset = 96;

        root.scrollTo({
          top: Math.max(0, targetTop - topOffset),
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [isOpen, reduceMotion, safeInitialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const root = scrollRef.current;
    if (!root) return;

    const visibleRatios = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(index)) continue;
          if (entry.isIntersecting) {
            visibleRatios.set(index, entry.intersectionRatio);
          } else {
            visibleRatios.delete(index);
          }
        }
        if (visibleRatios.size === 0) return;
        const sorted = Array.from(visibleRatios.entries()).sort((a, b) => b[1] - a[1]);
        const next = sorted[0]?.[0];
        if (typeof next === 'number') setActiveIndex(next);
      },
      {
        root,
        threshold: [0.35, 0.55, 0.75, 0.95],
      }
    );

    for (const element of itemRefs.current) {
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [images.length, isOpen]);

  const overlayTransition = useMemo(
    () => ({
      duration: reduceMotion ? 0 : 0.24,
      ease: 'easeOut' as const,
    }),
    [reduceMotion]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-top"
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        >
          <motion.div className="absolute inset-0 bg-black/90" />

          <div
            ref={scrollRef}
            className="relative h-dvh overflow-y-auto px-4 pb-10 pt-[max(.75rem,env(safe-area-inset-top))] sm:px-8 sm:pb-12 md:px-10 lg:px-12"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <div className="sticky top-[max(.75rem,env(safe-area-inset-top))] z-20 mb-6 sm:mb-7 md:mb-8">
              <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 rounded-[16px] bg-black/65 px-3 py-3 text-white backdrop-blur sm:px-4 sm:py-4">
                <div className="min-w-0">
                  <p className="text-balance text-base font-bold leading-tight sm:text-lg md:text-xl">{projectTitle}</p>
                  <p className="mt-1 max-w-[75ch] text-pretty text-xs text-white/80 sm:text-sm">
                    {projectSubtitle}
                  </p>
                </div>
                <div className="flex flex-shrink-0 self-center items-center gap-2">
                  <span className="inline-flex h-10 items-center rounded-full bg-black/50 px-3 text-xs font-semibold text-white">
                    {images.length === 0 ? '0 / 0' : `${activeIndex + 1} / ${images.length}`}
                  </span>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                    aria-label="Close image viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              className="mx-auto w-full max-w-[1280px]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.995 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.995 }}
              transition={overlayTransition}
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((image, index) => (
                <figure
                  key={image.id ?? `${image.src}-${index}`}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  data-index={index}
                  className="m-0"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index <= safeInitialIndex + 1 ? 'eager' : 'lazy'}
                    decoding="async"
                    className={[
                      'block w-full object-cover',
                      index === 0 ? 'rounded-t-[16px] sm:rounded-t-[20px] md:rounded-t-[24px]' : '',
                      index === images.length - 1 ? 'rounded-b-[16px] sm:rounded-b-[20px] md:rounded-b-[24px]' : '',
                    ].join(' ')}
                  />
                </figure>
              ))}
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
