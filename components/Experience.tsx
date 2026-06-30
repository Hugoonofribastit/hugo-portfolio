"use client";

import { useT } from "@/lib/i18n/useT";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  const t = useT();
  return (
    <section className="sec" id="experience">
      <ParallaxItem className="ghost-no" speed={0.05}>
        03
      </ParallaxItem>
      <div className="wrap">
        <SectionHeader no={t.experience.no} title={t.experience.label} meta={t.experience.meta} />
        <div className="exp-list">
          {t.experience.items.map((it, i) => (
            <InView as="article" key={`${it.org}-${i}`} className="exp reveal" delay={i * 60}>
              <div className="exp__meta">
                <span className="exp__period">{it.period}</span>
                <span className="exp__org">{it.org}</span>
                {it.client && <span className="exp__client">{it.client}</span>}
              </div>
              <div className="exp__body">
                <h3 className="exp__role">{it.role}</h3>
                <ul className="exp__points">
                  {it.points.map((p, j) => (
                    <li key={j}>
                      <span className="exp__mk">/</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
