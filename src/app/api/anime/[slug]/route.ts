import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");
    let { slug } = await params;

    // Fix the slug format if it starts with "anime"
    if (slug.startsWith("anime")) {
      slug = slug.replace(/^anime/, "");
    }

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    // Construct the API URL using the format from the example
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/otakudesu/anime/${slug}`;

    const { data } = await axios.get(apiUrl, {
      timeout: 10000, // 10 second timeout
    });

    // Transform data: hapus '/otakudesu/' di href
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (
        key === "href" &&
        typeof value === "string" &&
        value.includes("/otakudesu/")
      ) {
        return value.replace("/otakudesu/", "/");
      }
      return value;
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    // Get detailed error information
    let errorMessage = "Failed to fetch anime data";
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      errorMessage = error.message;
      statusCode = error.response?.status || 500;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
