const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Fetch anime data by slug
export async function fetchAnimeBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("anime")) {
      const originalSlug = slug;
      slug = slug.replace(/^anime/, "");
      console.log(`Correcting slug from ${originalSlug} to ${slug}`);
    }

    console.log(`Fetching anime data for slug: ${slug}`);
    console.log(`API URL: ${NEXT_PUBLIC_URL}/api/anime/${slug}`);

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/${slug}`, {
      cache: "no-store",
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
      next: {
        revalidate: 60, // Revalidate every 60 seconds
      },
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "No error text available");
      console.error(`API Error (${res.status}): ${errorText}`);
      throw new Error(
        `Failed to fetch anime data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching anime data for slug ${slug}:`, error);
    throw error;
  }
}
