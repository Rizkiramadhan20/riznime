import { MetadataRoute } from "next";

const ENV_BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export default function robots(): MetadataRoute.Robots {
  // On Vercel, prefer https and the deployment domain when available
  const fallback = ENV_BASE_URL?.startsWith("http") ? ENV_BASE_URL : "";
  const host = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: host ? `${host}/sitemap.xml` : undefined,
  };
}
