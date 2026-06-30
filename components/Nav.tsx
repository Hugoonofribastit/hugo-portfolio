"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/useT";
import { LangToggle } from "./LangToggle";

const LINKS = [
  { href: "#work", key: "work" },
  { href: "#about", key: "about" },
  { href: "#stack", key: "stack" },
  { href: "#experience", key: "experience" },
  { href: "#contact", key: "contact" },
] as const;

export function Nav() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="top">
      <div className="nav__in">
        <a className="brand" href="#top" aria-label="Hugo Onofri Bastit, home">
          <span className="brand__mark">HO</span>
          <span className="brand__name">
            <b>Hugo Onofri Bastit</b>
            <span>{t.nav.brandSub}</span>
          </span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href}>
              {t.nav[l.key]}
            </a>
          ))}
          <a className="nav__cta nav-extra" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            {t.nav.cv}
          </a>
          <LangToggle />
          <span className="nav__menu-tag">{t.nav.menu}</span>
        </nav>
      </div>
    </header>
  );
}
