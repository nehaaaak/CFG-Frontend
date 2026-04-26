"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentUser, loginUser } from "@/lib/api/auth/auth";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await loginUser(data); // calls your backend directly
    },

    onSuccess: async () => {
      toast.success("Login successful");

      // mark query as fetching so isLoading = true on home page
      queryClient.setQueryData(["me"], undefined);
      queryClient.invalidateQueries({ queryKey: ["me"] });

      getCurrentUser()
        .then((user) => queryClient.setQueryData(["me"], user))
        .catch(() => {});

      router.push("/");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || "Login failed");
    },
  });
};
