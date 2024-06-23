import http from "../utils/http";

export interface FetchCategoryOptions {
  id?: string;
  name?: string;
  description?: string;
}

export const fetchCategory = async (

) => {
  try {
  

    const response = await http.get("/categories");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
