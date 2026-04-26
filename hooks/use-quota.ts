import { useQuery } from "@tanstack/react-query";
import { getQuota } from "@/lib/api/auth/quota";
import { toast } from "sonner";

export const useQuota = () => {
  return useQuery({
    queryKey: ["quota"],
    queryFn: async () => {
      try {
        return await getQuota();
      } catch (err: any) {
        toast.error(
          err?.response?.data?.detail ??
            "Failed to load quota. Please try again.",
        );
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
