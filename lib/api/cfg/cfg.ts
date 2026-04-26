import { serverApi } from "@/lib/axios";

export const generateCFG = async (code: string) => {
  const res = await serverApi.post("/cfg/generate", {
    code,
    language: "python",
  });

  return res.data;
};
