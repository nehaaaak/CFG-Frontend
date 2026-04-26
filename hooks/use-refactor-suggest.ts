import { useQuery } from "@tanstack/react-query";
import { refactorSuggest } from "@/lib/api/cfg/refactor-suggest";

export const useRefactorSuggest = (
  payload: {
    session_id: string;
    function_name: string;
  } | null,
) => {
  return useQuery({
    queryKey: ["refactor-suggest", payload?.session_id, payload?.function_name],
    queryFn: () => refactorSuggest(payload!),
    enabled: !!payload,
    staleTime: Infinity,
    retry: false,
  });
};
