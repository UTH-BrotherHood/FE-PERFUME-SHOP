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

export const getCart = async () => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.get("/cart/", config);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
export const deleteFromCart = async (productId: string) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.delete(`/cart/`, {
      data: { product_id: productId },
      ...config
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting from cart:", error);
    throw error;
  }
};


export const changeQuantity = async (item: ICartItem) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.patch(`/cart/`, { product_id: item.product_id, quantity: item.quantity }, config);
    return response.data;
  } catch (error) {
    console.error("Error changing quantity:", error);
    throw error;
  }
};
