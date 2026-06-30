"use client";

import { useRef } from "react";

/** Anchor styled as a Kinetic .btn with a magnetic pointer effect (fine pointers, non-reduced). */
export function MagneticLink({
  href,
  children,
  className = "",
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const aRef = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (
      !window.matchMedia("(pointer:fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const a = aRef.current;
    const inner = innerRef.current;
    if (!a) return;
    const r = a.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    const s = 0.32;
    a.style.transform = `translate(${(x * s).toFixed(1)}px, ${(y * s).toFixed(1)}px)`;
    if (inner) inner.style.transform = `translate(${(x * s * 0.45).toFixed(1)}px, ${(y * s * 0.45).toFixed(1)}px)`;
  };

  const reset = () => {
    if (aRef.current) aRef.current.style.transform = "";
    if (innerRef.current) innerRef.current.style.transform = "";
  };

  return (
    <a
      ref={aRef}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`btn ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </a>
  );
}
