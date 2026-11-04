import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: el sitio es 100% estático y se sirve desde Vercel (o cualquier CDN).
  output: "export",
  images: { unoptimized: true },
  // CSS inline en el HTML: un request bloqueante menos para el primer pintado.
  experimental: { inlineCss: true },
  reactStrictMode: true,
};

export default nextConfig;
