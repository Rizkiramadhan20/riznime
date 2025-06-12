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

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/anichin/home`
    );

    // Transform data: hapus '/anichin/' di href
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (
        key === "href" &&
        typeof value === "string" &&
        value.includes("/anichin/")
      ) {
        return value.replace("/anichin/", "/");
      }
      return value;
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("❌ Failed to fetch anime data:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime data" },
      { status: 500 }
    );
  }
}
