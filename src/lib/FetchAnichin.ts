import { formatSlug } from "@/base/helper/FormatSlugAnichin";

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
