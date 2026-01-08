
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterProps = {
  text: string;
  speed?: number; // ms per character
  startDelay?: number; // ms
  cursor?: boolean;
  className?: string;
  cursorClassName?: string;
  onDone?: () => void;
};

/**
 * Stable typewriter:
 * - Only re-runs when `text` changes.
 * - Won't reset on parent re-renders.
 * - Uses refs to avoid timers being cleared or reset improperly.
 */
export function Typewriter({
  text,
  speed = 26,
  startDelay = 250,
  cursor = true,
  className,
  cursorClassName,
  onDone,
}: TypewriterProps) {
  const reduce = useReducedMotion();

  // The rendered length
  const [count, setCount] = useState(0);

  // Prevent repeated onDone calls
  const doneRef = useRef(false);

  // Track last text to reset only when changed
  const lastTextRef = useRef(text);

  // Timers
  const startTimerRef = useRef<number | null>(null);
  const tickTimerRef = useRef<number | null>(null);

  const done = useMemo(() => count >= text.length, [count, text.length]);

  // Reset ONLY if text changes
  useEffect(() => {
    if (lastTextRef.current !== text) {
      lastTextRef.current = text;
      doneRef.current = false;
      setCount(0);
    }
  }, [text]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
      if (tickTimerRef.current) window.clearTimeout(tickTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (reduce) {
      // Reduced motion: show full text immediately
      setCount(text.length);
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }

    // If already done, fire onDone once
    if (done) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }

    // Start delay before typing
    if (count === 0 && startDelay > 0) {
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current);
      startTimerRef.current = window.setTimeout(() => {
        setCount(1);
      }, startDelay);
      return;
    }

    // Typing tick
    if (tickTimerRef.current) window.clearTimeout(tickTimerRef.current);
    tickTimerRef.current = window.setTimeout(() => {
      setCount((c) => Math.min(c + 1, text.length));
    }, speed);

  }, [reduce, done, count, speed, startDelay, text.length, onDone]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span className={className}>
      {shown}
      {cursor && (
        <span
          className={
            cursorClassName ??
            "inline-block align-baseline ml-1 w-[2px] h-[0.9em] bg-current opacity-80 animate-pulse"
          }
          aria-hidden="true"
        >
          &nbsp;
        </span>
      )}
    </span>
  );
}
