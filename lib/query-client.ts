import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "./utils";

export function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => {
        const status = error?.response?.status;

        // Skip auth errors (handled by interceptor)
        if (status === 401 || status === 403) return;

        toast.error(getErrorMessage(error));
      },
    }),

    mutationCache: new MutationCache({
      onError: (error: any) => {
        const status = error?.response?.status;

        // Skip auth errors
        if (status === 401 || status === 403) return;

        toast.error(getErrorMessage(error));
      },
    }),

    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,

        // Smart retry logic
        retry: (failureCount, error: any) => {
          const status = error?.response?.status;

          // Never retry auth errors
          if (status === 401 || status === 403) return false;

          // Retry only once for others
          return failureCount < 1;
        },

        refetchOnWindowFocus: false,
      },

      mutations: {
        // Never retry mutations (VERY important)
        retry: 0,
      },
    },
  });
}
