"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/useT";
import { profile } from "@/lib/content";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { SectionHeader } from "./SectionHeader";

export function About() {
  const t = useT();
  return (
    <section className="sec" id="about">
      <ParallaxItem className="ghost-no" speed={0.05}>
        01
      </ParallaxItem>
      <div className="wrap">
        <SectionHeader no={t.about.no} title={t.about.label} meta={t.about.meta} />
        <div className="about__grid">
          <InView as="figure" className="portrait reveal clip">
            <div className="portrait__frame">
              <Image
                src={profile.photo}
                alt={`${profile.name} — ${t.about.portraitPlace}`}
                fill
                sizes="(max-width: 860px) 80vw, 340px"
              />
            </div>
            <figcaption className="portrait__cap">
              <span>{t.about.portraitName}</span>
              <span>{t.about.portraitPlace}</span>
            </figcaption>
            <span className="portrait__tag">{t.about.portraitTag}</span>
          </InView>

          <InView className="about__body reveal" delay={80}>
            <p>
              <span className="hl">{t.about.bodyLead}</span> {t.about.body}
            </p>
            <div className="about__loc">
              <span className="pin" /> {t.about.location}
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
