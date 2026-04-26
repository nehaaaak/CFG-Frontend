"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactFlowProvider } from "reactflow";
import CFGGraph from "@/components/home/graph/CFGGraph";
import { useCompareCFG } from "@/hooks/use-compare-cfg";
import { cn } from "@/lib/utils";
import type { UIGraph } from "@/types/cfg";
import { mapCFGToGraph } from "@/lib/mapCFGToGraph";

type CompareCFGViewProps = {
  sessionId: string;
  functionName: string;
  onBack: () => void;
};

// type MetricRow = {
//   label: string;
//   origKey: keyof ReturnType<typeof buildMetricRows>[number]["orig"];
// };

function buildMetricRows(
  orig: any,
  refactored: any,
): {
  label: string;
  original: number | string;
  refactored: number | string;
  improvement: string | null;
  isResolved?: boolean;
}[] {
  const pct = (a: number, b: number) => {
    if (a === 0) return null;
    const diff = ((b - a) / a) * 100;
    if (diff === 0) return null;
    return `↓ ${Math.abs(Math.round(diff))}%`;
  };

  return [
    {
      label: "Cyclomatic Complexity",
      original: orig.cyclomatic_complexity,
      refactored: refactored.cyclomatic_complexity,
      improvement: pct(
        orig.cyclomatic_complexity,
        refactored.cyclomatic_complexity,
      ),
    },
    {
      label: "Nodes",
      original: orig.nodes,
      refactored: refactored.nodes,
      improvement: pct(orig.nodes, refactored.nodes),
    },
    {
      label: "Edges",
      original: orig.edges,
      refactored: refactored.edges,
      improvement: pct(orig.edges, refactored.edges),
    },
    {
      label: "Decisions",
      original: orig.decision_points,
      refactored: refactored.decision_points,
      improvement: pct(orig.decision_points, refactored.decision_points),
    },
    {
      label: "Loops",
      original: orig.loops,
      refactored: refactored.loops,
      improvement: null,
    },
    {
      label: "Issues",
      original: orig.issues_count,
      refactored: refactored.issues_count,
      improvement: null,
      isResolved: orig.issues_count > 0 && refactored.issues_count === 0,
    },
  ];
}

// Matches exactly what useHomeCFG builds for cfgData
function adaptCFG(cfg: {
  nodes: Record<string, any>[];
  edges: Record<string, any>[];
}): UIGraph {
  const nodeIds = new Set(cfg.nodes.map((n: any) => String(n.id ?? "")));

  // Keep nodes as raw data — CFGGraph's layoutGraph will assign real positions
  const nodes: UIGraph["nodes"] = cfg.nodes.map((n: any) => ({
    id: String(n.id ?? ""),
    position: { x: 0, y: 0 }, // layoutGraph overrides these anyway
    data: {
      label: n.label ?? String(n.id ?? ""),
      line: n.line_number ?? 0,
      type: (n.type ?? "process") as "start" | "end" | "decision" | "process",
    },
  }));

  const edges: UIGraph["edges"] = cfg.edges
    .map((e: any) => {
      const source = String(e.from_node ?? e.source ?? e.from ?? e.start ?? "");
      const target = String(e.to_node ?? e.target ?? e.to ?? e.end ?? "");
      return {
        id: `${source}-${target}-${e.label ?? ""}`,
        source,
        target,
        label: e.label ?? "",
      };
    })
    .filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));

  return { nodes, edges };
}

export const CompareCFGView = ({
  sessionId,
  functionName,
  onBack,
}: CompareCFGViewProps) => {
  const { data, isFetching, isError, error } = useCompareCFG(
    sessionId && functionName
      ? { session_id: sessionId, function_name: functionName }
      : null,
  );

  const errorMessage =
    (error as any)?.response?.data?.detail ?? "Failed to compare CFGs.";

  const rows = data
    ? buildMetricRows(data.original.metrics, data.refactored.metrics)
    : [];

  const originalGraph = data ? mapCFGToGraph(data.original.cfg as any) : null;
  const refactoredGraph = data
    ? mapCFGToGraph(data.refactored.cfg as any)
    : null;

  console.log(data);

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={onBack}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Code
        </Button>
      </div>

      {/* Loading */}
      {isFetching && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Comparing CFGs…
          </div>
        </div>
      )}

      {/* Error */}
      {isError && !isFetching && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="relative rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3.5 max-w-sm w-full">
            <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />
            <p className="text-sm text-foreground/85">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Content */}
      {data && !isFetching && (
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 p-4">
          {/* Dual CFG panels */}
          <div className="grid grid-cols-2 gap-4" style={{ height: "360px" }}>
            {/* Original */}
            <div className="border rounded-lg flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm font-medium">Original CFG</span>
                <div className="ml-auto">
                  <IssuesBadge
                    count={data.original.metrics.issues_count}
                    inline
                  />
                </div>
              </div>
              <div
                // className="flex-1 min-h-0 relative"
                className="relative shrink-0"
                style={{ height: "320px" }}
              >
                <ReactFlowProvider>
                  <CFGGraph
                    data={originalGraph}
                    // selectedNodeId={null}
                    // onNodeClick={() => {}}
                  />
                </ReactFlowProvider>
              </div>
            </div>

            {/* Refactored */}
            <div className="border rounded-lg flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm font-medium">Refactored CFG</span>
                <div className="ml-auto">
                  <IssuesBadge
                    count={data.refactored.metrics.issues_count}
                    resolved={
                      data.original.metrics.issues_count > 0 &&
                      data.refactored.metrics.issues_count === 0
                    }
                    inline
                  />
                </div>
              </div>
              <div className="flex-1 min-h-0 relative">
                <ReactFlowProvider>
                  <CFGGraph
                    data={refactoredGraph}
                    selectedNodeId={null}
                    onNodeClick={() => {}}
                  />
                </ReactFlowProvider>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-2 gap-4 min-h-0">
            Original
            <div
              className="border rounded-lg flex flex-col min-h-0"
              style={{ height: "340px" }}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm font-medium">Original CFG</span>
                <IssuesBadge count={data.original.metrics.issues_count} />
              </div>
              <div className="flex-1 min-h-0 relative">
                <ReactFlowProvider>
                  <CFGGraph data={originalGraph} />
                </ReactFlowProvider>
              </div>
            </div>

            Refactored
            <div
              className="border rounded-lg flex flex-col min-h-0"
              style={{ height: "340px" }}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm font-medium">Refactored CFG</span>
                <IssuesBadge
                  count={data.refactored.metrics.issues_count}
                  resolved={
                    data.original.metrics.issues_count > 0 &&
                    data.refactored.metrics.issues_count === 0
                  }
                />
              </div>
              <div className="flex-1 min-h-0 relative">
                <ReactFlowProvider>
                  <CFGGraph data={refactoredGraph} />
                </ReactFlowProvider>
              </div>
            </div>
          </div> */}

          {/* Metrics comparison table */}
          <div className="border rounded-lg overflow-hidden shrink-0">
            <div className="flex items-center gap-2 px-4 py-3 border-b">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span className="text-sm font-medium">Metrics Comparison</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="text-center px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Original CFG
                  </th>
                  <th className="text-center px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Refactored CFG
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Improvement
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-b last:border-0",
                      i % 2 === 0 ? "" : "bg-muted/10",
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-sm">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {row.label === "Issues" ? (
                        <IssuesBadge count={row.original as number} inline />
                      ) : (
                        row.original
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {row.label === "Issues" ? (
                        <IssuesBadge
                          count={row.refactored as number}
                          resolved={row.isResolved}
                          inline
                        />
                      ) : (
                        row.refactored
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {row.isResolved ? (
                        <span className="text-emerald-500 font-medium">
                          Resolved
                        </span>
                      ) : row.improvement ? (
                        <span className="text-emerald-500 font-medium">
                          {row.improvement}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function IssuesBadge({
  count,
  resolved = false,
  inline = false,
}: {
  count: number;
  resolved?: boolean;
  inline?: boolean;
}) {
  if (resolved || count === 0) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center",
          inline ? "" : "ml-auto",
        )}
      >
        <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-emerald-500"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </span>
    );
  }
  if (count === 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-medium",
        inline ? "" : "ml-auto",
      )}
    >
      {count}
    </span>
  );
}
