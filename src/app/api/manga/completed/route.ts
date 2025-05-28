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

    // Get page from URL search params
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/komiku/completed?page=${page}`
    );

    // Transform data: hapus '/otakudesu/' di href
    const transformedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (
        key === "href" &&
        typeof value === "string" &&
        value.includes("/komiku/")
      ) {
        return value.replace("/komiku/", "/");
      }
      return value;
    });

    return NextResponse.json({
      statusCode: 200,
      statusMessage: "OK",
      message: "",
      ok: true,
      data: transformedData.data,
      pagination: transformedData.pagination,
    });
  } catch (error) {
    console.error("❌ Failed to fetch manga completed data:", error);
    return NextResponse.json(
      { error: "Failed to fetch manga completed data" },
      { status: 500 }
    );
  }
}
