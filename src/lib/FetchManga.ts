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
