const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Ambil hanya data untuk Anime Data

export async function fetchDaftarAnimeData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/daftar-anime`, {
      cache: "no-store", // 🔥 agar tidak cache
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data; // Return the complete response data
  } catch (error) {
    console.error("Error fetching daftar anime data:", error);
    throw error;
  }
}
