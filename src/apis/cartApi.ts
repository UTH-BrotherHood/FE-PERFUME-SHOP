import http from "../utils/http";

interface ICartItem {
  product_id: string;
  quantity: number;
}

interface IWishlistItem {
  product_id: string;
}

const getToken = () => {
  return localStorage.getItem('accessToken') || ''; 
};

export const addToCart = async (item: ICartItem) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.post("/cart/", item, config);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const addToWishlist = async (item: IWishlistItem) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.post("/wishlist/", item, config);
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};
