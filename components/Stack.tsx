"use client";

import { useT } from "@/lib/i18n/useT";
import { stackGroups } from "@/lib/content";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { SectionHeader } from "./SectionHeader";

export function Stack() {
  const t = useT();
  return (
    <section className="sec" id="stack">
      <ParallaxItem className="ghost-no" speed={0.05}>
        02
      </ParallaxItem>
      <div className="wrap">
        <SectionHeader no={t.stack.no} title={t.stack.label} meta={t.stack.meta} />
        <div className="stack__rows">
          {stackGroups.map((g, i) => (
            <InView key={g.category} className="srow reveal" delay={i * 70}>
              <div className="srow__label">{t.stack.categories[g.category] ?? g.category}</div>
              <div className="srow__items">
                {g.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
              <div className="srow__n">/ 0{i + 1}</div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
