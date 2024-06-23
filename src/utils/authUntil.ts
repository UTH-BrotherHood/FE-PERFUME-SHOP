

import { selectAccessToken } from "../store/features/authSlice";
import { useAppSelector } from "../store/store";

export const isAuthenticated = (): boolean => {
  const accessToken = useAppSelector(selectAccessToken); 
  return !!accessToken;
};
