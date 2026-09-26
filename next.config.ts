import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repo.endsWith(".github.io");
const basePath =
  process.env.PAGES === "true" && repo && !isUserSite ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
