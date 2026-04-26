import { serverApi } from "@/lib/axios";

export const explainNode = async (payload: {
  session_id: string;
  function_name: string;
  node_id: string;
}) => {
  const res = await serverApi.post("/ai/explain-node", payload);
  return res.data;
};