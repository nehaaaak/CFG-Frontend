"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, refreshToken } from "@/lib/api/auth/auth";
import { getAccessToken, setAccessToken } from "@/lib/token-store";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const hasSession = document.cookie.includes("has_session=true");
      if (!hasSession) return null;

      if (!getAccessToken()) {
        const res = await refreshToken();
        setAccessToken(res.access_token);
      }

      return getCurrentUser();
    },
    retry: false,
    staleTime: Infinity,
  });

  const isLoading = query.isFetching && query.data === undefined;

  return {
    user: query.data ?? null,
    isLoading,
    isAuthenticated: !!query.data,
  };
};
