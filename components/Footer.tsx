"use client";

import { useT } from "@/lib/i18n/useT";

const LINKS = [
  { href: "#work", key: "work" },
  { href: "#about", key: "about" },
  { href: "#stack", key: "stack" },
  { href: "#experience", key: "experience" },
  { href: "#contact", key: "contact" },
] as const;

export function Footer() {
  const t = useT();
  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div className="footer__brand">
          <span className="footer__mark" aria-hidden>
            HO
          </span>
          <div>
            <b>Hugo Onofri Bastit</b>
            <span>{t.footer.brandSub}</span>
          </div>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href}>
              {t.nav[l.key]}
            </a>
          ))}
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            {t.nav.cv}
          </a>
        </nav>
        <a className="footer__top" href="#top">
          {t.footer.backTop} ↗
        </a>
      </div>
    </footer>
  );
}
