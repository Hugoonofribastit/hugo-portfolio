"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Tag = keyof React.JSX.IntrinsicElements;

/**
 * Polymorphic in-view wrapper. Pass the Kinetic classes you want
 * (e.g. "sec-head reveal", "sec-title clip", "portrait reveal clip");
 * `in-view` is appended once visible. `delay` staggers via the --rd CSS var.
 *
 * Robust against timing: uses a callback ref, reveals immediately if the
 * element is already within the viewport at mount, and otherwise observes.
 */
export function InView({
  as = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: Tag;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  const [inView, setInView] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);
  const setRef = useCallback((node: HTMLElement | null) => {
    elRef.current = node;
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Reveal right away if already on screen (handles fast jump-scrolls / above the fold).
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  const cls = `${className}${inView ? " in-view" : ""}`;
  const style = delay ? ({ "--rd": `${delay}ms` } as React.CSSProperties) : undefined;
  const kids = Array.isArray(children) ? children : [children];
  return React.createElement(as, { ref: setRef, className: cls, style }, ...kids);
}
