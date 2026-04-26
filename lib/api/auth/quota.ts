import { serverApi } from "@/lib/axios";

export const getQuota = async () => {
  const res = await serverApi.get("/auth/quota");
  return res.data;
};
