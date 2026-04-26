import { serverApi } from "@/lib/axios";

export const getCFGHistory = async () => {
  const res = await serverApi.get("/cfg/history");
  return res.data;
};

export const getCFGSession = async (sessionId: string) => {
  const res = await serverApi.get(`/cfg/session/${sessionId}`);
  return res.data;
};
