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

// ✅ Ambil hanya data untuk Anichin Genre Data
export const fetchAnichinGenreData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/genres`,
      {
        next: {
          revalidate: 5, // Revalidate milisecond
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

    return transformedData;
  } catch (error) {
    console.error("Error fetching anichin genre data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Anichin Schedule Data
export const fetchAnichinScheduleData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/schedule`,
      {
        next: {
          revalidate: 5, // Revalidate milisecond
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

    return transformedData;
  } catch (error) {
    console.error("Error fetching anichin schedule data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Ongoing
export async function fetchOngoinData(page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/ongoing?page=${page}`,
      {
        next: { revalidate: 5 }, // Validasi ulang setiap 5 detik
      }
    );

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

// ✅ Ambil hanya data untuk Manga Completed Data
export const fetchDonghuaCompletedData = async (page: number = 1) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/completed?page=${page}`,
      {
        next: {
          revalidate: 50, // Revalidate every hour
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Transform data using formatSlug with better error handling
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (key === "href" && typeof value === "string") {
        try {
          // Clean the string to remove problematic Unicode characters
          const cleanedValue = value
            .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes with regular quotes
            .replace(/[\u201C\u201D]/g, '"') // Replace smart double quotes with regular double quotes
            .replace(/[\u2013\u2014]/g, "-") // Replace em/en dashes with regular hyphens
            .replace(/[\u2026]/g, "...") // Replace ellipsis with three dots
            .replace(/[^\x00-\x7F]/g, ""); // Remove other non-ASCII characters

          return formatSlug(cleanedValue);
        } catch (error) {
          console.warn("Error formatting slug for:", value, error);
          return value; // Return original value if formatting fails
        }
      }
      return value;
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching completed data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Genre Anichin Id Data
export async function fetchAnichinGenresId(genreId: string, page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/genres/${genreId}?page=${page}`,
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
    console.error("Error fetching manga genres data:", error);
    return null;
  }
}

// ✅ Ambil hanya data untuk Search Anichin Data
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
// ✅ Ambil hanya data untuk Anichin By Slug Data
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

// ✅ Ambil hanya data untuk Episode Data
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

// ✅ Ambil hanya data untuk Server Data
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
