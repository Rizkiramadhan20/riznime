import axios from "axios";

const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

interface ServerResponse {
  statusCode: number;
  statusMessage: string;
  message: string;
  ok: boolean;
  data: {
    url: string;
  };
  pagination: null;
}

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
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/genres`, {
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
      `${NEXT_PUBLIC_URL}/api/anime/genres/${genreId}?page=${page}`,
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
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/schedule`, {
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
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/ongoing`, {
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
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/completed`, {
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

// ✅ Ambil hanya data untuk Anime By Slug
export async function fetchAnimeBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("anime")) {
      slug = slug.replace(/^anime/, "");
    }

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/${slug}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
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

// ✅ Ambil hanya data untuk Semua Anime 
export async function fetchDaftarAnimeData() {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/daftar-anime`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
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

// ✅ Ambil hanya data untuk Episode
export async function fetchEpisodeBySlug(slug: string) {
  try {
    // Correct the slug if it starts with "anime"
    if (slug.startsWith("episode")) {
      slug = slug.replace(/^episode/, "");
    }

    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/episode/${slug}`, {
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

// ✅ Ambil hanya data untuk Server
export const fetchServerUrl = async (
  serverId: string
): Promise<ServerResponse> => {
  try {
    const response = await axios.get<ServerResponse>(
      `/api/anime/server/${serverId}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch server URL"
      );
    }
    throw new Error("Failed to fetch server URL");
  }
};

// ✅ Ambil hanya data untuk Search
export async function searchAnime(query: string) {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_URL}/api/anime/search?q=${encodeURIComponent(query)}`,
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
