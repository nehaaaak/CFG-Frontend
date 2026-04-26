"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/lib/api/auth/auth";
import { useRouter } from "next/navigation";
import { clearTokens } from "@/lib/token-store";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      clearTokens();
      queryClient.setQueryData(["me"], null); // explicitly null = logged out
      queryClient.cancelQueries({ queryKey: ["me"] }); // stop any in-flight refetch
      router.push("/login");
    },
  });
};
