
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useMobileMotionGate } from "../../hooks/useMobileMotionGate";

/**
 * LivingBackground: A high-end atmospheric background system.
 * Features:
 * 1. Animated morphing blobs (GPU accelerated)
 * 2. Shifting grid overlay (infinite movement)
 * 3. Noise grain texture
 * 4. Theme-aware colors
 * 
 * Mobile: Renders a lightweight static gradient for performance.
 */
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export const LivingBackground = () => {
  const { darkMode } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const skipHeavyAnimations = useMobileMotionGate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Mobile/reduced-motion: render lightweight static gradient
  if (skipHeavyAnimations) {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <div className={cn(
          "absolute inset-0",
          darkMode
            ? 'bg-gradient-to-br from-accent/10 via-transparent to-fuchsia-600/5 opacity-40'
            : 'bg-gradient-to-br from-accent/5 via-transparent to-fuchsia-200/5 opacity-30'
        )} />
        {/* Simple vignette for depth */}
        <div className={cn(
          "absolute inset-0",
          darkMode
            ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.7)_100%)]'
            : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.7)_100%)]'
        )} />
      </div>
    );
  }

  const animateBackground = !reduce && isVisible;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Base Gradient Glow (Hero anchor) */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-full h-screen scale-[1.4] blur-[120px] rounded-full will-change-[filter,opacity]",
        reduce ? "opacity-25" : "opacity-40",
        darkMode ? 'bg-accent/20' : 'bg-accent/10'
      )} />

      {/* 2. Athos-style Hero Blobs (Larger, softer) */}
      <div className="absolute inset-0 overflow-hidden">
        <Blob
          color={darkMode ? "bg-accent/15" : "bg-accent/10"}
          size="w-full h-full scale-[0.8]"
          initial={{ top: "-10%", left: "10%" }}
          animate={{
            x: [0, 60, -20, 0],
            y: [0, -20, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          duration={30}
          animateEnabled={animateBackground}
          reduce={reduce}
        />
        <Blob
          color={darkMode ? "bg-indigo-500/10" : "bg-indigo-200/5"}
          size="w-full h-full scale-[0.7]"
          initial={{ top: "20%", right: "-10%" }}
          animate={{
            x: [0, -40, 50, 0],
            y: [0, 60, -30, 0],
            scale: [1.1, 1, 1.05, 1.1],
          }}
          duration={40}
          delay={2}
          animateEnabled={animateBackground}
          reduce={reduce}
        />
      </div>

      {/* 3. Three Animated Morphing Blobs (General atmospheric) */}
      <div className="absolute inset-0">
        <Blob
          color={darkMode ? "bg-accent/15" : "bg-accent/10"}
          size="w-full h-full scale-[0.5]"
          initial={{ top: "10%", left: "-10%" }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -40, 20, 0],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 50% 50% 30% 70%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
          }}
          duration={25}
          animateEnabled={animateBackground}
          reduce={reduce}
        />
        <Blob
          color={darkMode ? "bg-fuchsia-600/10" : "bg-fuchsia-200/5"}
          size="w-full h-full scale-[0.45]"
          initial={{ bottom: "10%", right: "10%" }}
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -20, 0],
            borderRadius: ["50% 50% 20% 80% / 25% 80% 20% 75%", "40% 60% 40% 60% / 40% 60% 40% 60%", "50% 50% 20% 80% / 25% 80% 20% 75%"]
          }}
          duration={35}
          delay={1}
          animateEnabled={animateBackground}
          reduce={reduce}
        />
      </div>

      {/* 4. Soft Grid Overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.02]",
          animateBackground && "animate-grid will-change-[background-position]",
          reduce && "opacity-[0.01]",
          darkMode ? 'invert opacity-[0.04]' : ''
        )}
        style={{
          backgroundImage: `linear-gradient(#000 1.2px, transparent 1.2px), linear-gradient(90deg, #000 1.2px, transparent 1.2px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* 5. Vignette Depth */}
      <div className={cn(
        "absolute inset-0 will-change-opacity",
        darkMode
          ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.7)_100%)]'
          : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,250,250,0.7)_100%)]'
      )} />
    </div>
  );
};

type MotionValues = string | number | Array<string | number>;
type MotionTarget = Record<string, MotionValues>;

interface BlobProps {
  color: string;
  size: string;
  initial: MotionTarget;
  animate: MotionTarget;
  duration: number;
  delay?: number;
  reduce: boolean;
  animateEnabled: boolean;
}

const Blob = ({ color, size, initial, animate, duration, delay = 0, reduce, animateEnabled }: BlobProps) => {
  const shouldAnimate = animateEnabled && !reduce;

  return (
    <motion.div
      initial={initial}
      animate={shouldAnimate ? animate : undefined}
      transition={shouldAnimate ? {
        duration,
        repeat: Infinity,
        ease: "linear",
        delay
      } : undefined}
      style={!shouldAnimate ? (initial as React.CSSProperties) : undefined}
      className={cn(
        "absolute blur-[100px] rounded-full pointer-events-none",
        shouldAnimate && "will-change-transform",
        reduce && "opacity-60",
        color,
        size
      )}
    />
  );
};
