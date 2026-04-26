import { useQuery } from "@tanstack/react-query";
import { refactorCode } from "@/lib/api/cfg/refactor-code";

export const useRefactorCode = (
  payload: {
    session_id: string;
    function_name: string;
  } | null,
) => {
  return useQuery({
    queryKey: ["refactor-code", payload?.session_id, payload?.function_name],
    queryFn: () => refactorCode(payload!),
    enabled: !!payload,
    staleTime: Infinity,
    retry: false,
  });
};
