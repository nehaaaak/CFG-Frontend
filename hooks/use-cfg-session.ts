import { useQueryClient } from "@tanstack/react-query";
import { getCFGSession } from "@/lib/api/cfg/history";
import { CFG_QUERY_KEY } from "@/hooks/use-cfg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCFGSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loadSession = async (sessionId: string, code?: string) => {
    setIsLoading(true);
    try {
      const data = await getCFGSession(sessionId);
      queryClient.setQueryData(CFG_QUERY_KEY, data);
      if (code) queryClient.setQueryData(["cfg-code"], code);
      queryClient.setQueryData(["cfg-code-last"], code ?? "");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return { loadSession, isLoading };
};
