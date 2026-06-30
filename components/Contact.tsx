"use client";

import { useT } from "@/lib/i18n/useT";
import { profile, socials } from "@/lib/content";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { SectionHeader } from "./SectionHeader";
import { MagneticLink } from "./MagneticLink";

export function Contact() {
  const t = useT();
  const href = (label: string, fallback: string) =>
    socials.find((s) => s.label === label)?.href ?? fallback;
  const email = href("Email", "mailto:hugo.onofribastit@gmail.com");

  return (
    <section className="sec contact" id="contact">
      <ParallaxItem className="ghost-no" speed={0.05}>
        04
      </ParallaxItem>
      <div className="wrap">
        <SectionHeader no={t.contact.no} title={t.contact.label} meta={t.contact.meta} />

        <InView as="h3" className="contact__title reveal">
          {t.contact.title}
          <span className="pt">.</span>
        </InView>
        <InView as="p" className="contact__body reveal" delay={80}>
          {t.contact.body}
        </InView>

        <InView className="contact__btns reveal" delay={140}>
          <MagneticLink href={email} className="magnetic">
            Email <span className="arr">↗</span>
          </MagneticLink>
          <MagneticLink href={href("LinkedIn", "#")} target="_blank" rel="noopener noreferrer" className="btn--ghost magnetic">
            LinkedIn
          </MagneticLink>
          <MagneticLink href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn--ghost magnetic">
            {t.contact.download}
          </MagneticLink>
        </InView>

        <InView className="contact__mail reveal" delay={200}>
          <a href={email}>{profile.email}</a>
          <span>{t.contact.emailNote}</span>
        </InView>
      </div>
    </section>
  );
}
