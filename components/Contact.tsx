"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/useT";
import { profile, socials } from "@/lib/content";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { SectionHeader } from "./SectionHeader";
import { MagneticLink } from "./MagneticLink";

export function Contact() {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const href = (label: string, fallback: string) =>
    socials.find((s) => s.label === label)?.href ?? fallback;
  const email = href("Email", "mailto:hugo.onofribastit@gmail.com");
  const whatsapp = href("WhatsApp", "https://wa.me/5492235769886");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="sec contact" id="contact">
      <ParallaxItem className="ghost-no" speed={0.05}>
        05
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
          <MagneticLink href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn--ghost magnetic">
            WhatsApp
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
          <div className="contact__mail-aside">
            <button type="button" className="copy-btn" onClick={copyEmail} aria-live="polite">
              {copied ? t.contact.copied : t.contact.copy}
            </button>
            <span>{t.contact.emailNote}</span>
          </div>
        </InView>
      </div>
    </section>
  );
}
