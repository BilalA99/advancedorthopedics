"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the OS "reduce motion" setting for every Framer Motion component.
 *
 * The stylesheet already neutralises CSS animations and transitions under
 * `prefers-reduced-motion`, but Framer Motion drives inline styles from
 * JavaScript, so `transition-duration: 0.01ms !important` never touched it.
 * Reveal, SlidingDiv, TextAnimate and the marquee all kept moving for users who
 * had explicitly asked them not to.
 *
 * `reducedMotion="user"` skips transform and layout animation while still
 * allowing opacity and filter to resolve — so content that starts hidden (for
 * example TextAnimate's `{ opacity: 0, filter: blur(10px), y: 20 }`) still
 * becomes visible rather than being stranded invisible.
 */
export default function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
