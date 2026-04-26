import { useQuery } from "@tanstack/react-query";
import { compareCfg } from "@/lib/api/cfg/compare-cfg";

export const useCompareCFG = (
  payload: { session_id: string; function_name: string } | null,
) => {
  return useQuery({
    queryKey: ["compare-cfg", payload?.session_id, payload?.function_name],
    queryFn: () => compareCfg(payload!),
    enabled: !!payload,
    staleTime: Infinity,
    retry: false,
  });
};
