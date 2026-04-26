import { useState } from "react";
import { useCFG } from "@/hooks/use-cfg";
import { mapCFGToGraph } from "@/lib/mapCFGToGraph";
import { useCurrentUser } from "./auth/use-current-user";
import { useQueryClient } from "@tanstack/react-query";

export const useHomeCFG = () => {
  // const [code, setCode] = useState<string>("");
  const queryClient = useQueryClient();
  const [code, setCodeState] = useState<string>(
    () => queryClient.getQueryData<string>(["cfg-code"]) ?? "",
  );

  const setCode = (val: string) => {
    setCodeState(val);
    queryClient.setQueryData(["cfg-code"], val);
  };
  // const code = queryClient.getQueryData<string>(["cfg-code"]) ?? "";
  // const setCode = (val: string) => queryClient.setQueryData(["cfg-code"], val);
  const [sampleOpen, setSampleOpen] = useState(false);
  const [showImprovedCode, setShowImprovedCode] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(true);

  const { isAuthenticated } = useCurrentUser();

  // const {
  //   mutate: generateCFGMutation,
  //   data,
  //   isPending,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useCFG();

  const { generate, data, isPending, isSuccess, isError, error } = useCFG();

  const hasGenerated = isSuccess || isError || isPending;

  const fn = data?.functions?.[0];
  const staticAnalysis = fn ? data?.static_analysis?.[fn.name] : undefined;
  const sessionId = data?.session_id ?? "";
  const functionName = fn?.name ?? "";

  const cfgData = fn ? mapCFGToGraph(fn) : null;

  const cfgStats = fn
    ? {
        complexity: fn.cc,
        nodes: fn.metrics.nodes,
        edges: fn.metrics.edges,
        decisions: fn.metrics.decision_points,
        loops: fn.metrics.loops,
        linesOfCode: fn.metrics.lines_of_code,
        maxNestingDepth: fn.metrics.max_nesting_depth,
        complexityCategory: fn.metrics.complexity_category,
        riskLevel: fn.metrics.risk_level,
      }
    : undefined;

  const paths = fn ? fn.paths : undefined;
  const ai_explanation = fn ? data.ai_explanation : undefined;

  const codeSmells =
    staticAnalysis?.code_smells?.length > 0
      ? staticAnalysis.code_smells
      : undefined;

  const refactoringSuggestions =
    staticAnalysis?.refactoring_suggestions?.length > 0
      ? staticAnalysis.refactoring_suggestions
      : undefined;

  const analysisSummary = staticAnalysis?.summary ?? undefined;

  const halstead = staticAnalysis?.halstead ?? undefined;

  const dataFlow = staticAnalysis?.data_flow ?? undefined;

  const toggleEditorVisibility = () => {
    setIsEditorVisible((prev) => !prev);
  };

  const isCodeUnchanged =
    isSuccess &&
    code === (queryClient.getQueryData<string>(["cfg-code-last"]) ?? "");

  const handleGenerateCFG = () => {
    if (!code.trim()) return;
    queryClient.setQueryData(["cfg-code-last"], code);
    generate(code);
    // generateCFGMutation(code);
  };

  const handleImproveCode = () => {
    if (!isAuthenticated) return;
    setShowImprovedCode(true);
    // console.log("clicked");
  };

  const handleCloseImprovedCode = () => setShowImprovedCode(false);

  return {
    code,
    setCode,

    sampleOpen,
    setSampleOpen,

    isEditorVisible,
    toggleEditorVisibility,

    handleGenerateCFG,
    handleImproveCode,

    showImprovedCode,
    handleCloseImprovedCode,

    cfgData,
    cfgStats,

    paths,
    ai_explanation,

    codeSmells,
    refactoringSuggestions,
    analysisSummary,

    halstead,
    dataFlow,

    sessionId,
    functionName,

    hasGenerated,
    isCodeUnchanged,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
