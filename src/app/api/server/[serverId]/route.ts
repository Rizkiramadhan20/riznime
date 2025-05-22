import { NextResponse } from "next/server";

import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serverId: string }> }
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
        { status: 401 }
      );
    }

    try {
      const { serverId } = await params;

      if (!serverId) {
        return NextResponse.json(
          {
            statusCode: 400,
            statusMessage: "Error",
            message: "Server ID is required",
            ok: false,
            data: null,
            pagination: null,
          },
          { status: 400 }
        );
      }

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/otakudesu/server/${serverId}`
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
          { status: 404 }
        );
      }

      return NextResponse.json({
        statusCode: 200,
        statusMessage: "OK",
        message: "",
        ok: true,
        data: data.data,
        pagination: null,
      });
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
          { status: 404 }
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
      { status: statusCode || 500 }
    );
  }
}
