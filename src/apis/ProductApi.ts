import http from "../utils/http";

export const fetchProducts = async (token: string | null) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await http.get("/products", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};
