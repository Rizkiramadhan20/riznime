import { NextResponse } from "next/server";

import axios from "axios";

// Function to sanitize text by replacing Unicode quotes with ASCII quotes
function sanitizeText(text: string): string {
  return text
    .replace(/[\u2018\u2019]/g, "'") // Replace smart single quotes
    .replace(/[\u201C\u201D]/g, '"') // Replace smart double quotes
    .replace(/[\u2013\u2014]/g, "-"); // Replace en/em dashes
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");
    let { slug } = await params;

    // Fix the slug format if it starts with "manga"
    if (slug.startsWith("manga")) {
      slug = slug.replace(/^manga/, "");
    }

    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid API key" },
        { status: 401 }
      );
    }

    // Construct the API URL using the format from the example
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/komiku/manga/${slug}`;

    const { data } = await axios.get(apiUrl, {
      timeout: 10000, // 10 second timeout
    });

    // Transform data: hapus '/komiku/' di href and sanitize text
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (typeof value === "string") {
        // Sanitize text content
        value = sanitizeText(value);

        // Fix href paths
        if (key === "href" && value.includes("/komiku/")) {
          return value.replace("/komiku/", "/");
        }
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
