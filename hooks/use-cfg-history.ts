import { useQuery } from "@tanstack/react-query";
import { getCFGHistory } from "@/lib/api/cfg/history";

export const useCFGHistory = () => {
  return useQuery({
    queryKey: ["cfg-history"],
    queryFn: getCFGHistory,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
