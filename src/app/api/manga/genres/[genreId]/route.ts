import { NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ genreId: string }> }
) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return NextResponse.json(
        {
          statusCode: 401,
          statusMessage: "Error",
          message: "Unauthorized - Invalid API key",
          ok: false,
          data: null,
          pagination: null,
        },
        {
          status: 401,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    }

    try {
      const { genreId } = await params;
      const url = new URL(request.url);
      const page = url.searchParams.get("page") || "1";

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/komiku/genres/${genreId}?page=${page}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      if (!data?.data) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Server not found",
            ok: false,
            data: null,
            pagination: null,
          },
          {
            status: 404,
            headers: {
              "Cache-Control":
                "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
      }

      return NextResponse.json(
        {
          statusCode: 200,
          statusMessage: "OK",
          message: "",
          ok: true,
          data: data.data,
          pagination: data.pagination,
        },
        {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    } catch (axiosError: unknown) {
      if (
        axios.isAxiosError(axiosError) &&
        axiosError.response?.status === 404
      ) {
        return NextResponse.json(
          {
            statusCode: 404,
            statusMessage: "Error",
            message: "Server not found",
            ok: false,
            data: null,
            pagination: null,
          },
          {
            status: 404,
            headers: {
              "Cache-Control":
                "no-store, no-cache, must-revalidate, proxy-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
      }
      throw axiosError;
    }
  } catch (error: unknown) {
    const statusCode = axios.isAxiosError(error) ? error.response?.status : 500;
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Failed to fetch server data";
    return NextResponse.json(
      {
        statusCode: statusCode || 500,
        statusMessage: "Error",
        message: message || "Failed to fetch server data",
        ok: false,
        data: null,
        pagination: null,
      },
      {
        status: statusCode || 500,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  }
}
