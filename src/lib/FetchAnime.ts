const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

// ✅ Ambil hanya data untuk Anime Data
export async function fetchAnimeData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Banner
export async function FetchBannerData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Genres
export async function fetchGenresData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/genres`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching genres data:", error);
    throw error;
  }
}

// ✅ Ambil genres berdasarkan [genreId]
export async function fetchAnimeGenresId(genreId: string, page: number = 1) {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_URL}/api/genres/${genreId}?page=${page}`,
      {
        next: { revalidate: 5 }, // Revalidate every 5 seconds
        headers: {
          "x-api-key": NEXT_PUBLIC_API_KEY!,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch anime data");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return null;
  }
}

// ✅ Ambil hanya data untuk Schedule
export async function fetchScheduleData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/schedule`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data; // Return the full response object
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    throw error;
  }
}

// ✅ Ambil poster anime
export async function fetchAnimePoster(animeId: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/${animeId}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch anime poster");

    const data = await res.json();
    return data.data?.poster || null;
  } catch (error) {
    console.error("Error fetching anime poster:", error);
    return null;
  }
}

// ✅ Ambil hanya data untuk Ongoing
export async function fetchOngoingData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/ongoing`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return {
      animeList: data.data.animeList,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Completed
export async function fetchCompletedData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/completed`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
      headers: {
        "x-api-key": NEXT_PUBLIC_API_KEY!,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return {
      animeList: data.data.animeList,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching completed data:", error);
    throw error;
  }
}
