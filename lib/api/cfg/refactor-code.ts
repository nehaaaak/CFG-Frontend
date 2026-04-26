import { serverApi } from "@/lib/axios";

export const refactorCode = async (payload: {
  session_id: string;
  function_name: string;
}) => {
  const res = await serverApi.post("/ai/refactor-code", payload);
  return res.data;
};
