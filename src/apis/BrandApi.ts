import { PaginationParams } from "../types/paginationParams.type";
import http from "../utils/http";

export const GetAllBrand = async ({
  page = 0,
  limit = 0,
}: PaginationParams): Promise<any> => {
  try {
    const response = await http.get(
      `/brand/getall?limit=${limit}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch brand");
  }
};
