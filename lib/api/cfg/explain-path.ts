import { serverApi } from "@/lib/axios";

export const explainPath = async (payload: {
  session_id: string;
  function_name: string;
  path_node_ids: string[];
}) => {
  const res = await serverApi.post("/ai/explain-path", payload);
  return res.data;
};
