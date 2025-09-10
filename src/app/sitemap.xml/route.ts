import { fetchOngoinData as fetchAnimeOngoinData } from "@/lib/FetchAnime";

import {
  fetchMangaData,
  fetchMangaOngoingData,
  fetchMangaCompletedData,
  fetchMangaPopularData,
  fetchMangaRecentData,
} from "@/lib/FetchManga";

import {
  fetchAnichinData,
  fetchAnichinGenreData,
  fetchOngoinData as fetchAnichinOngoinData,
  fetchDonghuaCompletedData,
} from "@/lib/FetchAnichin";

// Import existing interfaces from the project
import { Anime } from "@/interface/anime";

import { DonghuaGenre, AnimeItem as DonghuaItem } from "@/interface/anichin";

interface OngoingAnimeData {
  ongoing: {
    href: string;
    otakudesuUrl: string;
    animeList: Anime[];
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_URL;

async function getAnimeSlugs(): Promise<
  Array<{ slug: string; updatedAt: Date }>
> {
  try {
    const slugs: Array<{ slug: string; updatedAt: Date }> = [];

    try {
      const ongoingData = await fetchAnimeOngoinData();

      if (ongoingData && Array.isArray(ongoingData)) {
        ongoingData.forEach((anime: Anime) => {
          if (anime.href) {
            // Use the original href directly without slug transformation
            slugs.push({
              slug: anime.href,
              updatedAt: new Date(),
            });
          }
        });
      } else if (
        ongoingData &&
        (ongoingData as OngoingAnimeData).ongoing &&
        (ongoingData as OngoingAnimeData).ongoing.animeList
      ) {
        // Handle the case where data has nested structure
        (ongoingData as OngoingAnimeData).ongoing.animeList.forEach(
          (anime: Anime) => {
            if (anime.href) {
              slugs.push({
                slug: anime.href,
                updatedAt: new Date(),
              });
            }
          }
        );
      }
    } catch {
      // Failed to fetch ongoing anime data
    }

    // Remove duplicates based on slug
    const uniqueSlugs = slugs.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.slug === item.slug)
    );

    return uniqueSlugs;
  } catch {
    return [];
  }
}

async function getMangaSlugs(): Promise<
  Array<{ slug: string; updatedAt: Date }>
> {
  try {
    const mangaData = await fetchMangaData();
    const ongoingData = await fetchMangaOngoingData();
    const completedData = await fetchMangaCompletedData();
    const popularData = await fetchMangaPopularData();
    const recentData = await fetchMangaRecentData();

    const slugs: Array<{ slug: string; updatedAt: Date }> = [];

    // Add manga data
    if (mangaData && Array.isArray(mangaData)) {
      mangaData.forEach((manga: Anime) => {
        if (manga.href) {
          // Use the original href directly
          slugs.push({
            slug: manga.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add ongoing manga data
    if (ongoingData && Array.isArray(ongoingData)) {
      ongoingData.forEach((manga: Anime) => {
        if (manga.href) {
          // Use the original href directly
          slugs.push({
            slug: manga.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add completed manga data
    if (completedData && Array.isArray(completedData)) {
      completedData.forEach((manga: Anime) => {
        if (manga.href) {
          // Use the original href directly
          slugs.push({
            slug: manga.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add popular manga data
    if (popularData && Array.isArray(popularData)) {
      popularData.forEach((manga: Anime) => {
        if (manga.href) {
          // Use the original href directly
          slugs.push({
            slug: manga.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add recent manga data
    if (recentData && Array.isArray(recentData)) {
      recentData.forEach((manga: Anime) => {
        if (manga.href) {
          // Use the original href directly
          slugs.push({
            slug: manga.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Remove duplicates based on slug
    const uniqueSlugs = slugs.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.slug === item.slug)
    );

    return uniqueSlugs;
  } catch {
    return [];
  }
}

async function getDonghuaSlugs(): Promise<
  Array<{ slug: string; updatedAt: Date }>
> {
  try {
    const anichinData = await fetchAnichinData();
    const genreData = await fetchAnichinGenreData();
    const ongoingData = await fetchAnichinOngoinData();
    const completedData = await fetchDonghuaCompletedData();

    const slugs: Array<{ slug: string; updatedAt: Date }> = [];

    // Add anichin data (donghua)
    if (anichinData && Array.isArray(anichinData)) {
      anichinData.forEach((donghua: DonghuaItem) => {
        if (donghua.href) {
          // Use the original href directly
          slugs.push({
            slug: donghua.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add genre data (donghua genres)
    if (genreData && Array.isArray(genreData)) {
      genreData.forEach((genre: DonghuaGenre) => {
        if (genre.href) {
          // Use the original href directly
          slugs.push({
            slug: genre.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add ongoing donghua data
    if (ongoingData && Array.isArray(ongoingData)) {
      ongoingData.forEach((donghua: DonghuaItem) => {
        if (donghua.href) {
          // Use the original href directly
          slugs.push({
            slug: donghua.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Add completed donghua data
    if (completedData && Array.isArray(completedData)) {
      completedData.forEach((donghua: DonghuaItem) => {
        if (donghua.href) {
          // Use the original href directly
          slugs.push({
            slug: donghua.href,
            updatedAt: new Date(),
          });
        }
      });
    }

    // Remove duplicates based on slug
    const uniqueSlugs = slugs.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.slug === item.slug)
    );

    return uniqueSlugs;
  } catch {
    return [];
  }
}

async function generateSitemap() {
  // Try to get dynamic data, but don't fail if it doesn't work
  let animeSlugs: Array<{ slug: string; updatedAt: Date }> = [];
  let mangaSlugs: Array<{ slug: string; updatedAt: Date }> = [];
  let donghuaSlugs: Array<{ slug: string; updatedAt: Date }> = [];

  try {
    animeSlugs = await getAnimeSlugs();
  } catch {
    // Add some sample anime URLs as fallback
    animeSlugs = [
      { slug: "naruto", updatedAt: new Date() },
      { slug: "one-piece", updatedAt: new Date() },
      { slug: "dragon-ball", updatedAt: new Date() },
      { slug: "attack-on-titan", updatedAt: new Date() },
      { slug: "demon-slayer", updatedAt: new Date() },
      { slug: "jujutsu-kaisen", updatedAt: new Date() },
      { slug: "my-hero-academia", updatedAt: new Date() },
      { slug: "black-clover", updatedAt: new Date() },
      { slug: "fairy-tail", updatedAt: new Date() },
      { slug: "bleach", updatedAt: new Date() },
    ];
  }

  try {
    mangaSlugs = await getMangaSlugs();
  } catch {
    // Add some sample manga URLs as fallback
    mangaSlugs = [
      { slug: "one-piece-manga", updatedAt: new Date() },
      { slug: "naruto-manga", updatedAt: new Date() },
      { slug: "bleach-manga", updatedAt: new Date() },
      { slug: "dragon-ball-manga", updatedAt: new Date() },
      { slug: "attack-on-titan-manga", updatedAt: new Date() },
      { slug: "demon-slayer-manga", updatedAt: new Date() },
      { slug: "jujutsu-kaisen-manga", updatedAt: new Date() },
      { slug: "my-hero-academia-manga", updatedAt: new Date() },
      { slug: "black-clover-manga", updatedAt: new Date() },
      { slug: "fairy-tail-manga", updatedAt: new Date() },
    ];
  }

  try {
    donghuaSlugs = await getDonghuaSlugs();
  } catch {
    // Add some sample donghua URLs as fallback
    donghuaSlugs = [
      { slug: "mo-dao-zu-shi", updatedAt: new Date() },
      { slug: "tian-guan-ci-fu", updatedAt: new Date() },
      { slug: "shaonian-ge-xing", updatedAt: new Date() },
      { slug: "xie-wang-zhui-qi", updatedAt: new Date() },
      { slug: "doupo-cangqiong", updatedAt: new Date() },
      { slug: "soul-land", updatedAt: new Date() },
      { slug: "battle-through-the-heavens", updatedAt: new Date() },
      { slug: "perfect-world", updatedAt: new Date() },
      { slug: "swallowed-star", updatedAt: new Date() },
      { slug: "lord-of-the-mysteries", updatedAt: new Date() },
    ];
  }

  const staticUrls = [
    { url: "/", lastmod: new Date().toISOString() },
    { url: "/anime", lastmod: new Date().toISOString() },
    { url: "/anime/ongoing", lastmod: new Date().toISOString() },
    { url: "/anime/completed", lastmod: new Date().toISOString() },
    { url: "/anime/daftar-anime", lastmod: new Date().toISOString() },
    { url: "/manga", lastmod: new Date().toISOString() },
    { url: "/manga/ongoing", lastmod: new Date().toISOString() },
    { url: "/manga/completed", lastmod: new Date().toISOString() },
    { url: "/manga/popular", lastmod: new Date().toISOString() },
    { url: "/manga/recent", lastmod: new Date().toISOString() },
    { url: "/donghua", lastmod: new Date().toISOString() },
    { url: "/donghua/ongoing", lastmod: new Date().toISOString() },
    { url: "/donghua/completed", lastmod: new Date().toISOString() },
  ];

  const dynamicUrls = [
    // Anime detail pages
    ...animeSlugs.map((anime: { slug: string; updatedAt: Date }) => ({
      url: `/anime/${anime.slug}`,
      lastmod: anime.updatedAt.toISOString(),
    })),
    // Manga detail pages
    ...mangaSlugs.map((manga: { slug: string; updatedAt: Date }) => ({
      url: `/manga/${manga.slug}`,
      lastmod: manga.updatedAt.toISOString(),
    })),
    // Donghua detail pages
    ...donghuaSlugs.map((donghua: { slug: string; updatedAt: Date }) => ({
      url: `/donghua/${donghua.slug}`,
      lastmod: donghua.updatedAt.toISOString(),
    })),
  ];

  const urls = [...staticUrls, ...dynamicUrls];

  // Build XML string manually to ensure proper formatting
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((item) => {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}${item.url}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += "    <changefreq>weekly</changefreq>\n";
    xml += "    <priority>0.8</priority>\n";
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  return xml;
}

// INI ROUTE HANDLER NEXT 13/14 YANG BENAR UNTUK GENERATE SITEMAP
export async function GET() {
  try {
    const body = await generateSitemap();

    return new Response(body, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("Error generating sitemap", { status: 500 });
  }
}
