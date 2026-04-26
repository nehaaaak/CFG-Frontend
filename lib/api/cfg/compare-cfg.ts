import { serverApi } from "@/lib/axios";

export type CFGMetrics = {
  cyclomatic_complexity: number;
  nodes: number;
  edges: number;
  decision_points: number;
  loops: number;
  risk_level: string;
  complexity_category: string;
  issues_count: number;
  code_smells: any[];
  hotspots: any[];
};

export type CFGGraph = {
  nodes: Record<string, any>[];
  edges: Record<string, any>[];
};

export type CompareCFGResponse = {
  original: { metrics: CFGMetrics; cfg: CFGGraph };
  refactored: { metrics: CFGMetrics; cfg: CFGGraph };
  error?: string;
};

export const compareCfg = async (payload: {
  session_id: string;
  function_name: string;
}): Promise<CompareCFGResponse> => {
  const res = await serverApi.post("/ai/compare-cfg", payload);
  return res.data;
};
