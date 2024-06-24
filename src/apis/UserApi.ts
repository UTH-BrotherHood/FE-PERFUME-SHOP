import { configConsumerProps } from "antd/es/config-provider";
import {
  ResetPasswordPayloadType,
  UserLoginPayloadType,
  UserRegisterPayloadType,
} from "../types/user.type";
import http from "../utils/http";

export const LoginUser = async (data: UserLoginPayloadType) => {
  const response = await http.post("/users/login", data);

  return response.data;
};
export const RegisterUser = async (data: UserRegisterPayloadType) => {
  const response = await http.post("/users/register", data);
  return response.data;
};
export const LogOutUser = async () => {
  const response = await http.post(`/user/log-out`);
  return response.data;
};
export const ResetPassword = async (data: ResetPasswordPayloadType) => {
  const response = await http.post(`/user/reset-password`, data);
  return response.data;
};

export const ForgetPassword = async (email: string) => {
 
  const response = await http.post(`/user/send-email`, { email: email });
  return response.data;
};

const getToken = () => {
  return localStorage.getItem('accessToken') || ''; 
};
export const getUserDetails = async () => {
 const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  const response = await http.get("/users/me", config);
  return response.data.result;
};