import metadata from "@/base/meta/Metadata";

const BASE_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// Add XML escape function
function escapeXml(unsafe?: string): string {
  const s = String(unsafe ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generateSitemap() {
  const now = new Date().toISOString();

  // Static sections across the site
  const urls = [
    // Home
    { url: "/", lastmod: now },

    // Anime sections
    { url: "/anime", lastmod: now },
    { url: "/anime/ongoing", lastmod: now },
    { url: "/anime/completed", lastmod: now },
    { url: "/anime/genres", lastmod: now },

    // Manga sections
    { url: "/manga", lastmod: now },
    { url: "/manga/ongoing", lastmod: now },
    { url: "/manga/completed", lastmod: now },
    { url: "/manga/popular", lastmod: now },
    { url: "/manga/recent", lastmod: now },
    { url: "/manga/genre", lastmod: now },

    // Donghua sections
    { url: "/donghua", lastmod: now },
    { url: "/donghua/ongoing", lastmod: now },
    { url: "/donghua/completed", lastmod: now },
    { url: "/donghua/genre", lastmod: now },

    // User/profile sections
    { url: "/profile", lastmod: now },
    { url: "/profile/settings", lastmod: now },
    { url: "/profile/bookmarks", lastmod: now },
    { url: "/profile/history", lastmod: now },

    // Dashboard root (protected, but included for structure)
    { url: "/dashboard", lastmod: now },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((item) => {
    const isHomePage = item.url === "/";
    const title = isHomePage
      ? metadata.title
      : `${item.url.split("/").pop() || ""} - ${metadata.title}`;
    const description = isHomePage
      ? metadata.openGraph.description
      : `${title} - ${metadata.openGraph.description}`;

    return `
  <url>
    <loc>${escapeXml(BASE_URL)}${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="${escapeXml(
      metadata.openGraph.locale
    )}" href="${escapeXml(BASE_URL)}${escapeXml(item.url)}" />
    <image:image>
      <image:loc>${escapeXml(BASE_URL)}${escapeXml(
      metadata.openGraph.images[0].url
    )}</image:loc>
      <image:title>${escapeXml(metadata.openGraph.images[0].alt)}</image:title>
      <image:caption>${escapeXml(description)}</image:caption>
      <image:license>${escapeXml(BASE_URL)}</image:license>
    </image:image>
  </url>`;
  })
  .join("")}
</urlset>`;

  return sitemapXml;
}

// INI ROUTE HANDLER NEXT 13/14 YANG BENAR UNTUK GENERATE SITEMAP
export async function GET() {
  try {
    const body = await generateSitemap();

    return new Response(body, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
