"use client";

import React, { useEffect, useRef } from "react";

type Tag = keyof React.JSX.IntrinsicElements;

/** Decorative element that drifts on scroll (ghost numbers, hero glow). Disabled for reduced motion. */
export function ParallaxItem({
  as = "span",
  speed = 0.06,
  className = "",
  children,
}: {
  as?: Tag;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const frame = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(frame);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);
  return React.createElement(
    as,
    { ref, className, "aria-hidden": true } as React.HTMLAttributes<HTMLElement>,
    children,
  );
}
