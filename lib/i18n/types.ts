export type Lang = "en" | "es";

export interface Dictionary {
  nav: {
    brandSub: string;
    work: string;
    about: string;
    stack: string;
    ai: string;
    experience: string;
    contact: string;
    cv: string;
    menu: string;
  };
  hero: {
    metaPortfolio: string;
    metaMid: string;
    metaLoc: string;
    kicker: string;
    role: string;
    accentWord: string;
    roleAccent: string;
    subcopy: string;
    ctaWork: string;
    ctaContact: string;
    side: {
      role: string;
      roleVal: string;
      focus: string;
      focusVal: string;
      cloud: string;
      cloudVal: string;
      base: string;
      baseVal: string;
      scroll: string;
    };
  };
  about: {
    no: string;
    label: string;
    meta: string;
    bodyLead: string;
    body: string;
    location: string;
    portraitName: string;
    portraitPlace: string;
    portraitTag: string;
  };
  stack: {
    no: string;
    label: string;
    meta: string;
    categories: Record<string, string>;
  };
  ai: {
    no: string;
    kicker: string;
    title: string;
    body: string;
    points: string[];
  };
  work: {
    no: string;
    label: string;
    meta: string;
    client: string;
    product: string;
    visit: string;
  };
  experience: {
    no: string;
    label: string;
    meta: string;
    items: { period: string; org: string; role: string; client: string; points: string[] }[];
  };
  contact: {
    no: string;
    label: string;
    meta: string;
    title: string;
    body: string;
    emailNote: string;
    download: string;
  };
  footer: {
    brandSub: string;
    backTop: string;
  };
}
