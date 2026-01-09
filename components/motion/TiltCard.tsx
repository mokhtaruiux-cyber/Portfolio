
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { transitions } from '../../lib/motionTokens';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "",
  intensity = 15
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, transitions.tight);
  const mouseY = useSpring(y, transitions.tight);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);
  
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full">
        {children}
      </div>
      
      {!shouldReduceMotion && (
        <motion.div 
          style={{
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.12) 0%, transparent 80%)`,
          }}
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      )}
    </motion.div>
  );
};
