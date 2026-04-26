import { explainNode } from "@/lib/api/cfg/explain-node";
import { useQuery } from "@tanstack/react-query";

export const useExplainNode = (payload: {
  session_id: string;
  function_name: string;
  node_id: string;
} | null) => {
  return useQuery({
    queryKey: ["explain-node", payload?.node_id],
    queryFn: () => explainNode(payload!),
    enabled: !!payload,
    staleTime: Infinity, // cache per node, never refetch
    retry: false,
  });
};