const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

export async function searchAnime(query: string) {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_URL}/api/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 5 }, // Revalidate every 5 seconds
        headers: {
          "x-api-key": NEXT_PUBLIC_API_KEY!,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch search results");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    throw error;
  }
}
