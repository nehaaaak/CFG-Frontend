"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/auth/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      toast.success("Registration successful. Please login.");

      router.push("/login");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Unable to register. Please try again.",
      );
    },
  });
};
