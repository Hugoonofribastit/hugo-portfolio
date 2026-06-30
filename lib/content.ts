// Structural, non-translatable content (proper nouns, tech names, URLs).
// Translatable copy lives in lib/i18n/{en,es}.ts, keyed by the ids below.

export type ProjectKind = "Client" | "Product";

export interface Project {
  id: string;
  name: string;
  kind: ProjectKind;
  url?: string;
  image?: string;
  tags: string[];
}

export interface StackGroup {
  category: string;
  items: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  org: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const profile = {
  name: "Hugo Onofri Bastit",
  email: "hugo.onofribastit@gmail.com",
  cv: "/cv.pdf",
  photo: "/hugoimg.jpeg",
  seal: "/hanko.svg",
} as const;

export const projects: Project[] = [
  {
    id: "enippon",
    name: "enippon",
    kind: "Client",
    url: "https://www.enippontours.com/",
    image: "/projects/enippon.png",
    tags: ["Next.js", "Landing", "Animation"],
  },
  {
    id: "chimbela",
    name: "Rebozadores Chimbela",
    kind: "Client",
    url: "https://rebozadoreschimbela.com/",
    image: "/projects/chimbela.png",
    tags: ["Web", "Branding"],
  },
  {
    id: "instacheck",
    name: "Instacheck",
    kind: "Product",
    url: "https://dev.instacheckapp.com/",
    image: "/projects/instacheck.png",
    tags: ["React Native", "Next.js", "Kotlin", "MongoDB", "PostgreSQL"],
  },
  {
    id: "pharmacy",
    name: "Pharmacy E-commerce",
    kind: "Client",
    tags: ["ReactJS", "MercadoPago"],
  },
  {
    id: "institute",
    name: "Educational Institute",
    kind: "Client",
    tags: ["ReactJS", "Bootstrap", "Node.js"],
  },
];

export const stackGroups: StackGroup[] = [
  { category: "frontend", items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "MUI", "Bootstrap"] },
  { category: "backend", items: ["Node.js", "Python", "FastAPI", "Flask", "Django REST", "Kotlin", "SQLAlchemy", "Alembic"] },
  { category: "cloud", items: ["AWS S3", "EC2", "Lambda", "API Gateway", "AppSync", "SQS", "CloudWatch", "Secrets Manager", "Serverless"] },
  { category: "data", items: ["PostgreSQL", "MongoDB", "SQL", "GraphQL"] },
  { category: "ai", items: ["Claude Code", "MCP servers", "Multi-agent", "Custom skills"] },
];

export const timeline: TimelineItem[] = [
  { id: "making-sense", period: "2022 — 2025", org: "Making Sense" },
  { id: "freelance", period: "2023 — Present", org: "Freelance" },
  { id: "mindhub", period: "Bootcamp", org: "MINDHUB" },
  { id: "unmdp", period: "—", org: "UNMDP" },
];

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:hugo.onofribastit@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hugoonofrib/" },
  { label: "WhatsApp", href: "https://wa.me/5492235769886" },
];

// Tech names for the marquee ticker (language-neutral).
export const marquee: string[] = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "FastAPI",
  "Python",
  "AWS Lambda",
  "API Gateway",
  "PostgreSQL",
  "GraphQL",
  "Claude Code",
  "MCP",
  "Multi-agent",
];
