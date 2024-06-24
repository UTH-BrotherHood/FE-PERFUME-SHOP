import http from "../utils/http";

export interface IShippingInfo {
     full_name: string
  phone_number: string
  address_line: string
  city: string
  country: string
}
export interface IPaymentInfo {
    payment_method: string
    

}
const getToken = () => {
  return localStorage.getItem('accessToken') || ''; 
};
export const createShippingAddress = async (shippingInfo: IShippingInfo) => {
    try {
       const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.post("/shipping-address", shippingInfo,config);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const processPayment = async (paymentInfo: IPaymentInfo) => {
    try {
          const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.post("/payment", paymentInfo,config);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const getAllShippingAddresses = async () => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.get("/shipping-address", config);
    return response.data.result; // Trả về danh sách địa chỉ giao hàng từ backend
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    throw error;
  }
};
export interface IorderInfo{
    address_id: string | undefined
    payment_id:string | undefined
}
export const placeOrderApiCall = async (orderInfo: IorderInfo) => {
    try {
          const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await http.post("/orders", orderInfo,config);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};