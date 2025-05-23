const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Ambil hanya data untuk Manga Data
export async function fetchMangaData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/manga`, {
      cache: "no-store", // 🔥 agar tidak cache
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching manga data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Manga berdasarkan slug
export async function fetchMangaBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("manga")) {
      slug = slug.replace(/^manga/, "");
    }

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/manga/${slug}`, {
      cache: "no-store",
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch manga data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// ✅ Ambil hanya data untuk Manga berdasarkan Chapter
export async function fetchMangaByChapter(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("chapter")) {
      slug = slug.replace(/^chapter/, "");
    }

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/chapter/${slug}`, {
      cache: "no-store", // Always fetch fresh data
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch chapter data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// ✅ Ambil hanya data untuk Manga Recent Data
export async function fetchMangaRecentData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/manga/recent`, {
      cache: "no-store", // 🔥 agar tidak cache
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data; // Return the complete response
  } catch (error) {
    console.error("Error fetching manga recent data:", error);
    throw error;
  }
}
