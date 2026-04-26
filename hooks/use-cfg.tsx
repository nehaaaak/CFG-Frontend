// import { generateCFG } from "@/lib/api/cfg/cfg";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";

// export const useCFG = () =>
//   useMutation({
//     mutationFn: generateCFG, // works with useMutation
//     onSuccess: () => toast.success("CFG generated successfully"),
//   });

import { generateCFG } from "@/lib/api/cfg/cfg";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const CFG_QUERY_KEY = ["cfg"];

export const useCFG = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: CFG_QUERY_KEY,
    queryFn: () => {
      const code = queryClient.getQueryData<string>(["cfg-code"]);
      return generateCFG(code!);
    },
    enabled: false,
    staleTime: Infinity,
    retry: false,
  });

  const generate = async (code: string) => {
    queryClient.setQueryData(["cfg-code"], code);
    await queryClient.fetchQuery({
      queryKey: CFG_QUERY_KEY,
      queryFn: () => generateCFG(code),
      staleTime: 0,
    });
    toast.success("CFG generated successfully");
  };

  return {
    generate,
    data: query.data,
    isPending: query.isFetching,
    isSuccess: query.isSuccess && !!query.data,
    isError: query.isError,
    error: query.error,
  };
};
