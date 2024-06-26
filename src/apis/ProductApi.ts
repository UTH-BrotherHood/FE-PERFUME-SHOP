import http from "../utils/http";

interface FetchProductsOptions {

  page?: number;
  limit?: number;
}

interface IProduct {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  discount: number;
  images: string[];
  stock: number;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}


export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await http.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const fetchProducts = async ({ page = 1, limit = 3 }: FetchProductsOptions) => {
  try {
    const config = {
      params: {
        
        page,
        limit
      }
    };

    const response = await http.get("/products", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


export const createProduct = async (product: IProduct) => {
  try {
    const response = await http.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};


export const deleteProduct = async (productId: string) => {
  try {
    const response = await http.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}