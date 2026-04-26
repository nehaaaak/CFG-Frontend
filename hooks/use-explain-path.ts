import { explainPath } from "@/lib/api/cfg/explain-path";
import { useQuery } from "@tanstack/react-query";

export const useExplainPath = (
  payload: {
    session_id: string;
    function_name: string;
    path_node_ids: string[];
  } | null,
) => {
  return useQuery({
    queryKey: ["explain-path", payload?.path_node_ids?.join("-")],
    queryFn: () => explainPath(payload!),
    enabled: !!payload,
    staleTime: Infinity,
    retry: false,
  });
};
