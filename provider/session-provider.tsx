"use client";

import { useEffect, useState } from "react";
import { setAccessToken, clearTokens } from "@/lib/token-store";
import { serverApi } from "@/lib/axios";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await serverApi.post("/auth/refresh");
        setAccessToken(res.data.access_token);
      } catch {
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    // Only attempt refresh if a session cookie hint exists
    const hasSession = document.cookie.includes("has_session=true");
    if (hasSession) {
      initAuth();
    } else {
      setIsLoading(false); // no cookie, open page directly
    }
  }, []);

  if (isLoading) return null; // or loader

  return <>{children}</>;
}
