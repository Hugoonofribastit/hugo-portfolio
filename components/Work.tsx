"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/useT";
import { projects, type Project } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/types";
import { InView } from "./ui/motion";
import { ParallaxItem } from "./ui/ParallaxItem";
import { SectionHeader } from "./SectionHeader";
import { MagneticLink } from "./MagneticLink";

function ProjectCard({ p, i, t }: { p: Project; i: number; t: Dictionary }) {
  const badge = p.kind === "Product" ? t.work.product : t.work.client;
  return (
    <InView as="article" className="work reveal">
      <a
        className="work__media"
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.work.visit}: ${p.name}`}
      >
        <Image src={p.image!} alt={p.name} fill sizes="(max-width: 860px) 100vw, 55vw" />
        <span className="work__badge">{badge}</span>
        <span className="work__view" aria-hidden>
          ↗
        </span>
      </a>
      <div className="work__body">
        <span className="work__no">/ 0{i + 1}</span>
        <h3 className="work__title">{p.name}</h3>
        <ul className="work__tags">
          {p.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        <MagneticLink
          href={p.url!}
          target="_blank"
          rel="noopener noreferrer"
          className="work__cta btn--ghost magnetic"
        >
          {t.work.visit} <span className="arr">↗</span>
        </MagneticLink>
      </div>
    </InView>
  );
}

export function Work() {
  const t = useT();
  const items = projects.filter((p) => p.image && p.url);
  return (
    <section className="sec" id="work">
      <ParallaxItem className="ghost-no" speed={0.05}>
        03
      </ParallaxItem>
      <div className="wrap">
        <SectionHeader no={t.work.no} title={t.work.label} meta={t.work.meta} />
        <div className="work-list">
          {items.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
