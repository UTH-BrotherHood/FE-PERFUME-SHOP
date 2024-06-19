import { categoryData } from "../data/categoriesData";
import { productData } from "../data/productData";
import {
  IProductTypeFilter,
  PaginationParams,
} from "../types/paginationParams.type";
import http from "../utils/http";

export const GetAllProducts = async ({
  page = 1,
  limit = 8,
  brand = "",
  category = "",
  minPrice,
  maxPrice,
  search = "",
  sort = "",
}: IProductTypeFilter): Promise<any> => {
  try {
    let url = `/product/get-all?limit=${limit}&page=${page}&sort=${sort}&search=${search}&types=${category}&brand=${brand}`;

    if (minPrice !== undefined) {
      url += `&minPrice=${minPrice}`;
    }
    if (maxPrice !== undefined) {
      url += `&maxPrice=${maxPrice}`;
    }

    const response = await http.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

export const GetProductById = async (productId: string): Promise<any> => {
  try {
    const response = await http.get(`/product/get-details/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch product with ID: ${productId}`);
  }
};

export const addAllProductsAPI = async () => {
  const promises = productData.map(async (product) => {
    try {
      const res = await http.post("/product/create", product);
      return res.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  });

  try {
    const results = await Promise.all(promises);
    console.log("All products added successfully:", results);
  } catch (error) {
    console.error("Error adding products:", error);
  }
};

export const addAllCategoryAPI = async () => {
  const promises = categoryData.map(async (product) => {
    try {
      const res = await http.post("/brand/create", product);
      return res.data;
    } catch (error) {
      console.error("Error adding categories:", error);
      throw error;
    }
  });

  try {
    const results = await Promise.all(promises);
    console.log("All categories added successfully:", results);
  } catch (error) {
    console.error("Error adding categories:", error);
  }
};
