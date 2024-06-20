import http from "../utils/http";

interface FetchCategoryOptions {
  id?: string;
  name?: string;
  description?: string;
}

export const fetchCategory = async (
  options: FetchCategoryOptions,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        ...options
      }
    };

    const response = await http.get("/categories", config);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
