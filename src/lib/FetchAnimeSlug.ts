const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Fetch anime data by slug
export async function fetchAnimeBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("anime")) {
      slug = slug.replace(/^anime/, "");
    }

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/${slug}`, {
      cache: "no-store",
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch anime data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
