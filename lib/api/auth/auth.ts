import { serverApi } from "@/lib/axios";
import { setAccessToken } from "@/lib/token-store";

export const registerUser = async (data: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const res = await serverApi.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await serverApi.post("/auth/login", data);
  // store access token in memory
  setAccessToken(res.data.access_token);
  return res.data;
};

export const refreshToken = async () => {
  const res = await serverApi.post("/auth/refresh");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await serverApi.get("/auth/me");
  // const res = await serverApi.get("/auth/me", {
  //   headers: token ? { Authorization: `Bearer ${token}` } : {},
  // });
  return res.data;
};

export const logoutUser = async () => {
  const res = await serverApi.post("/auth/logout");
  return res.data;
};
