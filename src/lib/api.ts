import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

export async function fetchAnimeData() {
  try {
    const response = await axios.get(`${BASE_URL}/api/anime`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    throw error;
  }
}

export async function BannerData() {
  try {
    const response = await axios.get(`${BASE_URL}/api/anime`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
}
