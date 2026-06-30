import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 enforces an allowlist; include the qualities we use.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
