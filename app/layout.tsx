import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hugoonofri.dev"),
  title: "Hugo Onofri Bastit — Full Stack Developer & AI Orchestrator",
  description:
    "Full-stack developer from Mar del Plata, Argentina. Complete web and mobile products with React, Next.js, FastAPI and AWS, plus AI agent orchestration with Claude Code.",
  keywords: [
    "Hugo Onofri Bastit",
    "Full Stack Developer",
    "Next.js",
    "React",
    "FastAPI",
    "AWS",
    "AI Orchestration",
    "Claude Code",
  ],
  authors: [{ name: "Hugo Onofri Bastit" }],
  openGraph: {
    type: "website",
    title: "Hugo Onofri Bastit — Full Stack Developer & AI Orchestrator",
    description:
      "Complete web and mobile products with React, Next.js, FastAPI and AWS, plus AI agent orchestration with Claude Code.",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Onofri Bastit — Full Stack Developer & AI Orchestrator",
    description: "Complete web and mobile products, plus AI agent orchestration with Claude Code.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f1f0ea",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        {/* Without JS, never keep reveal content hidden. */}
        <noscript>
          <style>{`.reveal,.clip{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
