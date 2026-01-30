import React from 'react';
import { motion, useScroll } from 'framer-motion';

const isPageScrollable = () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  const { documentElement, body } = document;
  const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
  return scrollHeight > window.innerHeight + 1;
};

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progressStyle = React.useMemo(() => ({ scaleX: scrollYProgress }), [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-top">
      <motion.div
        className="relative h-1 bg-accent origin-left"
        style={progressStyle}
      />
    </div>
  );
};

export const ScrollProgress: React.FC = () => {
  const [enabled, setEnabled] = React.useState(() => isPageScrollable());

  React.useEffect(() => {
    const update = () => {
      const scrollable = isPageScrollable();
      const visible = typeof document !== 'undefined' ? document.visibilityState === 'visible' : true;
      setEnabled(scrollable && visible);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    document.addEventListener('visibilitychange', update);
    return () => {
      window.removeEventListener('resize', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  if (!enabled) return null;

  return <ScrollProgressBar />;
};
