import metadata from "@/base/meta/Metadata";

const BASE_URL = process.env.NEXT_PUBLIC_URL!;

function escapeXml(unsafe?: string): string {
  const s = String(unsafe ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: Date): string {
  return date.toISOString().split(".")[0] + "+00:00";
}

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  title: string;
  description: string;
}

async function generateSitemap() {
  const now = formatDate(new Date());

  const urls: SitemapUrl[] = [
    // Main pages
    {
      url: "/",
      lastmod: now,
      changefreq: "daily",
      priority: 1.0,
      title: "Riznime - Pusatnya Anime",
      description: "Tonton anime, manga, dan donghua terbaru dengan subtitle Indonesia. Nikmati ribuan judul anime, manga, dan donghua berkualitas tinggi dengan streaming gratis di Riznime!"
    },

    // Anime pages
    {
      url: "/anime",
      lastmod: now,
      changefreq: "daily",
      priority: 0.9,
      title: "Daftar Anime Terbaru",
      description: "Lihat daftar anime terbaru dan populer dengan subtitle Indonesia. Streaming anime berkualitas tinggi secara gratis di Riznime."
    },
    {
      url: "/anime/ongoing",
      lastmod: now,
      changefreq: "daily",
      priority: 0.8,
      title: "Anime Ongoing",
      description: "Daftar anime yang sedang berlangsung dengan episode terbaru setiap minggunya. Update episode anime ongoing terbaru."
    },
    {
      url: "/anime/completed",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
      title: "Anime Completed",
      description: "Koleksi anime yang sudah selesai tayang. Tonton anime completed dengan kualitas terbaik."
    },
    {
      url: "/anime/genres",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
      title: "Genre Anime",
      description: "Jelajahi anime berdasarkan genre favorit Anda. Action, Romance, Comedy, dan genre anime lainnya."
    },

    // Manga pages
    {
      url: "/manga",
      lastmod: now,
      changefreq: "daily",
      priority: 0.9,
      title: "Daftar Manga Terbaru",
      description: "Baca manga terbaru dan populer dengan kualitas terbaik. Update chapter manga setiap hari di Riznime."
    },
    {
      url: "/manga/ongoing",
      lastmod: now,
      changefreq: "daily",
      priority: 0.8,
      title: "Manga Ongoing",
      description: "Daftar manga yang sedang berlangsung dengan chapter terbaru. Update chapter manga ongoing setiap hari."
    },
    {
      url: "/manga/completed",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
      title: "Manga Completed",
      description: "Koleksi manga yang sudah selesai. Baca manga completed dengan kualitas terbaik."
    },
    {
      url: "/manga/popular",
      lastmod: now,
      changefreq: "daily",
      priority: 0.8,
      title: "Manga Populer",
      description: "Daftar manga paling populer dan banyak dibaca. Manga terbaik yang wajib dibaca."
    },
    {
      url: "/manga/recent",
      lastmod: now,
      changefreq: "daily",
      priority: 0.8,
      title: "Manga Terbaru",
      description: "Update manga terbaru yang baru dirilis. Manga chapter terbaru setiap hari."
    },
    {
      url: "/manga/genre",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
      title: "Genre Manga",
      description: "Jelajahi manga berdasarkan genre favorit Anda. Action, Romance, Comedy, dan genre manga lainnya."
    },

    // Donghua pages
    {
      url: "/donghua",
      lastmod: now,
      changefreq: "daily",
      priority: 0.9,
      title: "Daftar Donghua Terbaru",
      description: "Tonton donghua terbaru dan populer dengan subtitle Indonesia. Streaming donghua berkualitas tinggi secara gratis."
    },
    {
      url: "/donghua/ongoing",
      lastmod: now,
      changefreq: "daily",
      priority: 0.8,
      title: "Donghua Ongoing",
      description: "Daftar donghua yang sedang berlangsung dengan episode terbaru. Update episode donghua ongoing terbaru."
    },
    {
      url: "/donghua/completed",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
      title: "Donghua Completed",
      description: "Koleksi donghua yang sudah selesai tayang. Tonton donghua completed dengan kualitas terbaik."
    },
    {
      url: "/donghua/genre",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.7,
      title: "Genre Donghua",
      description: "Jelajahi donghua berdasarkan genre favorit Anda. Action, Romance, Comedy, dan genre donghua lainnya."
    },

    // Profile and Dashboard pages
    {
      url: "/profile",
      lastmod: now,
      changefreq: "monthly",
      priority: 0.6,
      title: "Profile Pengguna",
      description: "Kelola profile dan preferensi Anda di Riznime. Lihat riwayat dan bookmark anime, manga, donghua favorit."
    },
    {
      url: "/profile/bookmarks",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.5,
      title: "Bookmark Saya",
      description: "Lihat dan kelola bookmark anime, manga, dan donghua favorit Anda."
    },
    {
      url: "/profile/history",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.5,
      title: "Riwayat Tonton",
      description: "Lihat riwayat anime, manga, dan donghua yang pernah Anda tonton atau baca."
    },
    {
      url: "/profile/settings",
      lastmod: now,
      changefreq: "monthly",
      priority: 0.4,
      title: "Pengaturan",
      description: "Kelola pengaturan akun dan preferensi Anda di Riznime."
    },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
      .map((item) => {
        return `
  <url>
    <loc>${escapeXml(BASE_URL)}${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
    <xhtml:link rel="alternate" hreflang="${escapeXml(
          metadata.openGraph.locale
        )}" href="${escapeXml(BASE_URL)}${escapeXml(item.url)}" />
    <image:image>
      <image:loc>${escapeXml(BASE_URL)}${escapeXml(
          metadata.openGraph.images[0].url
        )}</image:loc>
      <image:title>${escapeXml(item.title)}</image:title>
      <image:caption>${escapeXml(item.description)}</image:caption>
    </image:image>
  </url>`;
      })
      .join("")}
</urlset>`;

  return sitemapXml;
}

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
