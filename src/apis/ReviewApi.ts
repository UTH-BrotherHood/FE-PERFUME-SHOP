import http from "../utils/http";

const idUser = "6610df3cd0ebd1b2bd1f7c6d";

interface ReviewResponse {
  data: any;
}

export const addReview = async (
  productId: string,
  rating: number,
  comment: string,
  idUser: string,
): Promise<ReviewResponse> => {
  try {
    const response = await http.post("/review/add", {
      productId,
      idUser,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add review");
  }
};

export const getReviewsByProduct = async (
  productId: string,
): Promise<ReviewResponse> => {
  try {
    const response = await http.get(`/review/product/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch reviews for product with ID: ${productId}`,
    );
  }
};
