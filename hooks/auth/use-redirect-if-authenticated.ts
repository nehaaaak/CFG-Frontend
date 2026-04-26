"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "./use-current-user";

export const useRedirectIfAuthenticated = (redirectTo = "/") => {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  return { isLoading, isAuthenticated: !!user };
};
