import { ProductReqBody } from "../schemaValidations/product.schema";
import { IProductData } from "../types/product.type";
import http from "../utils/http";

interface FetchProductsOptions {
  category?: string;
  page?: number;
  limit?: number;
}

export const fetchProducts = async (
  { category, page = 1, limit = 3 }: FetchProductsOptions,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        category,
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

export const getProductById = async (productId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await http.get(`/products/${productId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting product by ID:", error);
    throw error;
  }
};

export const createProduct = async (product: ProductReqBody, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await http.post("/products", product, config);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productId: string, product: Partial<IProductData>, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await http.put(`/products/${productId}`, product, config);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await http.delete(`/products/${productId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
