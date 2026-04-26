import { serverApi } from "@/lib/axios";

export const refactorSuggest = async (payload: {
  session_id: string;
  function_name: string;
}) => {
  const res = await serverApi.post("/ai/refactor-suggest", payload);
  return res.data;
};
