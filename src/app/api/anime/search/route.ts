import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    // Get the search query from URL parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    const apiUrl = `https://api-anime-navy.vercel.app/otakudesu/search?q=${encodeURIComponent(
      query
    )}`;

    const { data } = await axios.get(apiUrl);

    // Transform the data to remove 'otakudesu' from href paths
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (
        (key === "href" || key === "otakudesuUrl") &&
        typeof value === "string" &&
        value.includes("/otakudesu/")
      ) {
        return value.replace("/otakudesu/", "/");
      }
      return value;
    });

    return NextResponse.json(transformedData);
  } catch (error: unknown) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
