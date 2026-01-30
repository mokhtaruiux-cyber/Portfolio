import React from 'react';
import { cn } from '../../lib/utils';
import { useMobileMotionGate } from '../../hooks/useMobileMotionGate';

export const HeroGlow: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const skipHeavyAnimations = useMobileMotionGate();

  // Mobile: render lightweight static gradient instead of animated blobs
  if (skipHeavyAnimations) {
    return (
      <div className="hero-glow" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: darkMode
              ? 'radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(168,85,247,0.2), transparent 55%)'
              : 'radial-gradient(ellipse at 30% 20%, rgba(96,165,250,0.25), transparent 55%), radial-gradient(ellipse at 70% 40%, rgba(147,197,253,0.2), transparent 55%)'
          }}
        />
      </div>
    );
  }

  return (
    <div className="hero-glow" aria-hidden="true">
      <div
        className={cn("hero-blob hero-blob-1 motion-reduce:animate-none")}
        style={{
          background: darkMode
            ? "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.5), transparent 70%)"
            : "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.5), transparent 70%)"
        }}
      />
      <div
        className={cn("hero-blob hero-blob-2 motion-reduce:animate-none")}
        style={{
          background: darkMode
            ? "radial-gradient(circle at 70% 40%, rgba(168,85,247,0.45), transparent 70%)"
            : "radial-gradient(circle at 70% 40%, rgba(147,197,253,0.45), transparent 70%)"
        }}
      />
      <div
        className={cn("hero-blob hero-blob-3 motion-reduce:animate-none")}
        style={{
          background: darkMode
            ? "radial-gradient(circle at 50% 60%, rgba(14,165,233,0.4), transparent 70%)"
            : "radial-gradient(circle at 50% 60%, rgba(59,130,246,0.4), transparent 70%)"
        }}
      />
    </div>
  );
};
