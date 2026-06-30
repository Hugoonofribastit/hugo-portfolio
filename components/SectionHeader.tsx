import { InView } from "./ui/motion";

/** Shared Kinetic section header: (0X) · Title (clip reveal) · meta. */
export function SectionHeader({ no, title, meta }: { no: string; title: string; meta: string }) {
  return (
    <InView as="header" className="sec-head reveal">
      <span className="sec-no">{no}</span>
      <InView as="h2" className="sec-title clip">
        {title}
      </InView>
      <span className="sec-meta">{meta}</span>
    </InView>
  );
}
