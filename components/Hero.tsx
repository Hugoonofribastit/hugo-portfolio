"use client";

import { useT } from "@/lib/i18n/useT";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { MagneticLink } from "./MagneticLink";

export function Hero() {
  const t = useT();
  const parts = t.hero.role.split(t.hero.accentWord);

  return (
    <section className="hero">
      <ParallaxItem className="hero__glow" speed={0.1} />
      <div className="wrap hero__inner">
        <div className="hero__main">
          <InView className="hero__meta reveal">
            <span>
              <b>{t.hero.metaPortfolio}</b> &nbsp;/&nbsp; 2026
            </span>
            <span className="meta-mid">{t.hero.metaMid}</span>
            <span>{t.hero.metaLoc}</span>
          </InView>

          <InView as="span" className="kicker reveal" delay={60}>
            <span className="dot" /> {t.hero.kicker}
          </InView>

          <InView as="h1" className="hero__title reveal" delay={120}>
            {parts[0]}
            <span className="accentword">{t.hero.accentWord}</span>
            {parts[1] ?? ""}
          </InView>

          <InView as="span" className="role-accent reveal" delay={180}>
            <span className="bar" /> {t.hero.roleAccent}
          </InView>

          <InView as="p" className="hero__sub reveal" delay={240}>
            {t.hero.subcopy}
          </InView>

          <InView className="hero__cta reveal" delay={300}>
            <MagneticLink href="#work" className="magnetic">
              {t.hero.ctaWork} <span className="arr">↗</span>
            </MagneticLink>
            <MagneticLink href="#contact" className="btn--ghost magnetic">
              {t.hero.ctaContact}
            </MagneticLink>
          </InView>
        </div>

        <aside className="hero__side" aria-hidden>
          <div className="spinwrap">
            <span className="idx">01</span>
            <span className="spinner">✳</span>
          </div>
          <div className="row">
            <span>{t.hero.side.role}</span>
            <b>{t.hero.side.roleVal}</b>
          </div>
          <div className="row">
            <span>{t.hero.side.focus}</span>
            <b>{t.hero.side.focusVal}</b>
          </div>
          <div className="row">
            <span>{t.hero.side.cloud}</span>
            <b>{t.hero.side.cloudVal}</b>
          </div>
          <div className="row">
            <span>{t.hero.side.base}</span>
            <b>{t.hero.side.baseVal}</b>
          </div>
          <span className="scrollcue">
            <span className="ln" /> {t.hero.side.scroll}
          </span>
        </aside>
      </div>
      <div className="hero__grid-line" style={{ bottom: 0 }} aria-hidden />
    </section>
  );
}
