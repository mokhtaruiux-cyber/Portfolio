
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * LivingBackground: A high-end atmospheric background system.
 * Features:
 * 1. Animated morphing blobs (GPU accelerated)
 * 2. Shifting grid overlay (infinite movement)
 * 3. Noise grain texture
 * 4. Theme-aware colors
 */
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

export const LivingBackground = () => {
  const { darkMode } = useTheme();
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Base Gradient Glow (Hero anchor) */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-full h-screen scale-[1.4] blur-[120px] rounded-full opacity-40 will-change-[filter,opacity]",
        darkMode ? 'bg-blue-600/20' : 'bg-blue-400/10'
      )} />

      {/* 2. Athos-style Hero Blobs (Larger, softer) */}
      <div className="absolute inset-0 overflow-hidden">
        <Blob
          color={darkMode ? "bg-blue-500/15" : "bg-blue-300/10"}
          size="w-full h-full scale-[0.8]"
          initial={{ top: "-10%", left: "10%" }}
          animate={{
            x: [0, 60, -20, 0],
            y: [0, -20, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          duration={30}
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
          reduce={reduce}
        />
      </div>

      {/* 3. Three Animated Morphing Blobs (General atmospheric) */}
      <div className="absolute inset-0">
        <Blob
          color={darkMode ? "bg-blue-600/15" : "bg-blue-400/10"}
          size="w-full h-full scale-[0.5]"
          initial={{ top: "10%", left: "-10%" }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -40, 20, 0],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 50% 50% 30% 70%", "30% 70% 70% 30% / 30% 30% 70% 70%"]
          }}
          duration={25}
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
          reduce={reduce}
        />
      </div>

      {/* 4. Soft Grid Overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.02] animate-grid will-change-[background-position]",
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
}

const Blob = ({ color, size, initial, animate, duration, delay = 0, reduce }: BlobProps) => {
  return (
    <motion.div
      initial={initial}
      animate={reduce ? { opacity: 0.6 } : animate}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay
      }}
      className={cn(
        "absolute blur-[100px] rounded-full will-change-transform pointer-events-none",
        color,
        size
      )}
    />
  );
};
