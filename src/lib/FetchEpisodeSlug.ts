const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Fetch anime data by slug
export async function fetchEpisodeBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("episode")) {
      slug = slug.replace(/^episode/, "");
    }

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/episode/${slug}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch episode data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
