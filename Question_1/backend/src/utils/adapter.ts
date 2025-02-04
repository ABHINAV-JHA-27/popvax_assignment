import axios from "axios";

export async function GET(url: string) {
  try {
    const response = await axios.get(url);
    return response.data || [];
  } catch (error) {
    console.error(`GET request failed: ${error}`);
    return [];
  }
}
