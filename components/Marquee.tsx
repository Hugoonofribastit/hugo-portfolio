import { Fragment } from "react";
import { marquee } from "@/lib/content";

/** Infinite tech-stack ticker (pure CSS animation; pauses on hover). */
export function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const seq = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {seq.map((item, i) => (
          <Fragment key={i}>
            <span>{item}</span>
            <span className="sep">✳</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
