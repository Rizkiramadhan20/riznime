import { formatSlug } from "@/base/helper/FormatSlugManga";

export const fetchMangaData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/home`, {
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

// ✅ Ambil hanya data untuk Manga berdasarkan slug

export async function fetchMangaBySlug(slug: string) {
  try {
    const cleanSlug = formatSlug(slug);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/manga/${cleanSlug}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch magan data details: ${res.status} ${res.statusText}`
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

// ✅ Ambil hanya data untuk Manga berdasarkan Chapter

export async function fetchMangaByChapter(slug: string) {
  try {
    const cleanSlug = formatSlug(slug);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/manga/chapter/${cleanSlug}`, {
      next: { revalidate: 5 }, // Revalidate every 5 seconds
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch chapter data details: ${res.status} ${res.statusText}`
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

// ✅ Ambil hanya data untuk Manga Recent Data
export const fetchMangaRecentData = async (page: number = 1) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/recent?page=${page}`, {
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

    return transformedData;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Manga Popular Data
export const fetchMangaPopularData = async (page: number = 1) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/popular?page=${page}`, {
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

    return transformedData;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Ongoing Data

export const fetchMangaOngoingData = async (page: number = 1) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/ongoing?page=${page}`, {
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

    return transformedData;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Manga Genre Data
export const fetchMangaGenreData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/genres`, {
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

    return transformedData;
  } catch (error) {
    console.error("Error fetching manga genre data:", error);
    throw error;
  }
};

// ✅ Ambil hanya data untuk Manga Completed Data
export const fetchMangaCompletedData = async (page: number = 1) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/komiku/completed?page=${page}`, {
      next: {
        revalidate: 50, // Revalidate every hour  
      },
    });

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
            .replace(/[\u2013\u2014]/g, '-') // Replace em/en dashes with regular hyphens
            .replace(/[\u2026]/g, '...') // Replace ellipsis with three dots
            .replace(/[^\x00-\x7F]/g, ''); // Remove other non-ASCII characters

          return formatSlug(cleanedValue);
        } catch (error) {
          console.warn('Error formatting slug for:', value, error);
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

// ✅ Ambil genres berdasarkan [genreId]
export async function fetchMangaGenresId(genreId: string, page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/komiku/genres/${genreId}?page=${page}`,
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
