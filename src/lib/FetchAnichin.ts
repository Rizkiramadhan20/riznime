import axios from "axios";

import { formatSlug } from "@/base/helper/FormatSlugAnichin";

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

// ✅ Ambil hanya data untuk Anichin Home
export const fetchAnichinData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/home`,
      {
        next: {
          revalidate: 5, // Revalidate every 5 seconds
        },
      }
    );

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

export async function searchDonghua(query: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/search?q=${encodeURIComponent(
        query
      )}`,
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
    console.error("Error searching donghua:", error);
    throw error;
  }
}

export async function fetchDonghuaBySlug(slug: string) {
  const cleanSlug = formatSlug(slug);

  // Coba ke endpoint anime dulu
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anichin/anime/${cleanSlug}`,
    { next: { revalidate: 5 } }
  );

  if (res.ok) {
    const data = await res.json();
    // Transform data using formatSlug
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });
    return { type: "anime", ...transformedData };
  }

  // Jika gagal, coba ke endpoint seri
  res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anichin/seri/${cleanSlug}`,
    { next: { revalidate: 5 } }
  );

  if (res.ok) {
    const data = await res.json();
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        return formatSlug(value);
      }
      return value;
    });
    return { type: "seri", ...transformedData };
  }

  // Jika dua-duanya gagal
  throw new Error("Data not found in both anime and seri endpoints");
}

export async function fetchEpisodeBySlug(slug: string) {
  try {
    const cleanSlug = formatSlug(slug);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/episode/${cleanSlug}`,
      {
        next: { revalidate: 5 }, // Revalidate every 5 seconds
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch episode data: ${res.status} ${res.statusText}`
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

export const fetchServerUrl = async (
  serverId: string
): Promise<ServerResponse> => {
  try {
    const response = await axios.get<ServerResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/server/${serverId}`
    );

    // Transform data using formatSlug
    const transformedData = JSON.parse(
      JSON.stringify(response.data),
      (key, value) => {
        if (key === "href" && typeof value === "string") {
          return formatSlug(value);
        }
        return value;
      }
    );

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
