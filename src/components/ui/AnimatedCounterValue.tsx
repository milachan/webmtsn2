'use client';

import { useState, useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterValueProps {
  /** Target number to count up to */
  value: number;
  /** Optional suffix (e.g., '+') */
  suffix?: string;
  /** When true, starts the count-up animation (one-time) */
  play: boolean;
  /** Delay in seconds before animation starts */
  delay?: number;
}

/**
 * Shared animated counter component.
 * Counts up from 0 to `value` with a smooth easing curve.
 * Animation plays only once per mount — controlled via `play` prop.
 */
export default function AnimatedCounterValue({
  value,
  suffix = '',
  play,
  delay = 0,
}: AnimatedCounterValueProps) {
  const [display, setDisplay] = useState(value);
  const hasPlayed = useRef(false);

  // Reset hasPlayed when value changes (e.g., API data finishes loading)
  // so the animation replays with the correct target value
  useEffect(() => {
    hasPlayed.current = false;
  }, [value]);

  useEffect(() => {
    if (!play) return;
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    // Reset to 0 so the count-up animation is visible
    setDisplay(0);

    const timer = setTimeout(() => {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
    // We intentionally only run this effect when `play` or `value` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, value]);

  return (
    <>{display}{suffix}</>
  );
}
