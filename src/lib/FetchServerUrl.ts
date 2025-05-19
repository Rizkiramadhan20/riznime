import axios from "axios";

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

export const fetchServerUrl = async (
  serverId: string
): Promise<ServerResponse> => {
  try {
    const response = await axios.get<ServerResponse>(
      `/api/server/${serverId}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch server URL"
      );
    }
    throw new Error("Failed to fetch server URL");
  }
};
