import axios from "axios";

import { formatSlug } from "@/base/helper/FormatSlug";

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

export const fetchAnimeData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/home`, {
      next: {
        revalidate: 50, // Revalidate every hour
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Banner
export async function FetchBannerData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/home`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Genres
export async function fetchGenresData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/genres`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData.data;
  } catch (error) {
    console.error("Error fetching genres data:", error);
    throw error;
  }
}

// ✅ Ambil genres berdasarkan [genreId]
export async function fetchAnimeGenresId(genreId: string, page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/otakudesu/genres/${genreId}?page=${page}`,
      {
        next: { revalidate: 5 }, // Revalidate every 5 seconds
      }
    );

    if (!res.ok) throw new Error("Failed to fetch anime data");

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return null;
  }
}

// ✅ Ambil hanya data untuk Schedule
export async function fetchScheduleData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/schedule`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Ongoing

export async function fetchOngoinData(page: number = 1) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/ongoing?page=${page}`, {
      next: { revalidate: 5 }, // Validasi ulang setiap 5 detik
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching ongoing data:", error);
    throw error;
  }
}

// ✅ Ambil hanya data untuk Completed

export async function fetchCompletedData(page: number = 1) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/completed?page=${page}`, {
      next: { revalidate: 5 }, // Validasi ulang setiap 5 detik
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching completed data:", error);
    throw error;
  }
}

// ✅ Ambil poster anime
export async function fetchAnimePoster(animeId: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_URL}/api/anime/${animeId}`, {
      next: { revalidate: 5 }, // Validasi ulang setiap 5 detik
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

// Ambil hanya data untuk Anime By Slug
export async function fetchAnimeBySlug(slug: string) {
  try {
    const cleanSlug = formatSlug(slug);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/anime/${cleanSlug}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch anime data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    throw error;
  }
}

// Ambil hanya data untuk Semua Anime 
export async function fetchDaftarAnimeData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/daftar-anime`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching daftar anime data:", error);
    throw error;
  }
}

// Ambil hanya data untuk Episode
export async function fetchEpisodeBySlug(slug: string) {
  try {
    const cleanSlug = formatSlug(slug);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/episode/${cleanSlug}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch episode data: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    // Fetch anime data to get the poster
    const animeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otakudesu/anime/${data.data.animeId}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (animeRes.ok) {
      const animeData = await animeRes.json();
      // Add the poster from anime data
      data.data.poster = animeData.data?.poster || null;
      // Add recommended anime list from anime data
      data.data.recommendedAnimeList = animeData.data?.recommendedAnimeList || [];
    }

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    throw error;
  }
}

// Ambil hanya data untuk Server
export const fetchServerUrl = async (
  serverId: string
): Promise<ServerResponse> => {
  try {
    const response = await axios.get<ServerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/otakudesu/server/${serverId}`
    );

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(response.data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch server URL"
      );
    }
    throw new Error("Failed to fetch server URL");
  }
};

// Ambil hanya data untuk Search
export async function searchAnime(query: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/otakudesu/search?q=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 5 }, // Revalidate every 5 seconds
      }
    );

    if (!res.ok) throw new Error("Failed to fetch search results");

    const data = await res.json();

    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });

    return transformedData.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    throw error;
  }
}
