import {
  ResetPasswordPayloadType,
  UserLoginPayloadType,
  UserRegisterPayloadType,
} from "../types/user.type";
import http from "../utils/http";

export const LoginUser = async (data: UserLoginPayloadType) => {
  const response = await http.post("/users/sign-in", data);

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
  console.log(email);
  const response = await http.post(`/user/send-email`, { email: email });
  return response.data;
};
