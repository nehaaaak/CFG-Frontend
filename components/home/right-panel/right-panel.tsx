import CFGGraph from "../graph/CFGGraph";
import {
  GitBranch,
  Loader2,
  PanelLeftOpen,
  BarChart2,
  ArrowLeft,
} from "lucide-react";
import CardHeader from "@/components/shared/card-header";
import type { UIGraph } from "@/types/cfg";
import { Node, ReactFlowProvider } from "reactflow";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "./metrics-card";
import { PathsCard } from "./paths-card";
import { AIExplanationCard } from "./ai-explanation-card";
import { CodeSmellsCard } from "./code-smells-card";
import { RefactoringSuggestionsCard } from "./refactoring-suggestions-card";
import { AdvancedMetricsCard } from "./advanced-metrics-card";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

type Stats = {
  complexity: number;
  nodes: number;
  edges: number;
  decisions: number;
  loops: number;
  linesOfCode: number;
  maxNestingDepth: number;
  complexityCategory: string;
  riskLevel: string;
};

type Suggestion = {
  priority: string;
  refactoring: string;
  reason: string;
  benefit: string;
  steps: string[];
};

type Halstead = {
  vocabulary: number;
  length: number;
  calculated_length: number;
  volume: number;
  difficulty: number;
  effort: number;
  time_to_program: number;
  bugs_delivered: number;
};

type DataFlow = {
  reaching_definitions_count: number;
  live_variables_count: number;
  def_use_chains_count: number;
  unused_variables: { block: number; variable: string }[];
};

type RightPanelProps = {
  isGenerating: boolean;
  hasGraph: boolean;
  data?: UIGraph | null;
  stats?: Stats;
  toggleEditorVisibility: () => void;
  isEditorVisible: boolean;
  aiExplanation?: string;
  codeSmells?: any[] | null;
  refactoringSuggestions?: Suggestion[] | null;
  halstead?: Halstead;
  dataFlow?: DataFlow;
  paths?: string[][];
  onNodeSelect?: (node: Node) => void;
  selectedNodeId?: string | null;
  onExplainPath?: (path: string[], index: number) => void;
  activePath?: number | null;
  sessionId?: string;
  functionName?: string;
};

const RightPanel = ({
  isGenerating,
  hasGraph,
  data,
  stats,
  isEditorVisible,
  toggleEditorVisibility,
  aiExplanation,
  codeSmells,
  refactoringSuggestions,
  halstead,
  dataFlow,
  paths = [],
  onNodeSelect,
  selectedNodeId,
  onExplainPath,
  activePath,
  sessionId,
  functionName,
}: RightPanelProps) => {
  const [showReport, setShowReport] = useState(false);

  const hasIssues = codeSmells && codeSmells.length > 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
        <CardHeader
          icon={GitBranch}
          title="Control Flow Graph"
          description="Generated CFG visualization"
        />
        <div className="flex items-center gap-2">
          {hasGraph && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 cursor-pointer"
              onClick={() => setShowReport((p) => !p)}
            >
              {showReport ? (
                <>
                  <ArrowLeft className="h-3.5 w-3.5" /> Graph & Metrics
                </>
              ) : (
                <>
                  <BarChart2 className="h-3.5 w-3.5" /> Quality Report
                </>
              )}
            </Button>
          )}
          {!isEditorVisible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleEditorVisibility}
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ── GRAPH VIEW ── */}
      {!showReport && (
        <>
          <div className="relative shrink-0" style={{ height: "320px" }}>
            <ReactFlowProvider>
              <CFGGraph
                data={data}
                selectedNodeId={selectedNodeId}
                onNodeClick={(node) => onNodeSelect?.(node)}
              />
            </ReactFlowProvider>

            {!hasGraph && !isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <GitBranch className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm font-medium">No Control Flow Graph</p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Write or load Python code and click{" "}
                    <span className="font-semibold">Generate CFG</span>
                  </p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Control Flow Graph…
                </div>
              </div>
            )}
          </div>

          {hasGraph && stats && (
            <div className="flex-1 min-h-0 overflow-y-auto border-t">
              <div className="p-4 space-y-3">
                <MetricsCard
                  complexity={stats.complexity}
                  nodes={stats.nodes}
                  edges={stats.edges}
                  decisions={stats.decisions}
                  loops={stats.loops}
                  maxNestingDepth={stats.maxNestingDepth}
                  complexityCategory={stats.complexityCategory}
                  riskLevel={stats.riskLevel}
                />
                <PathsCard
                  paths={paths}
                  onExplainPath={(path, index) => onExplainPath?.(path, index)}
                  activePath={activePath}
                />
                <AIExplanationCard explanation={aiExplanation ?? ""} />
              </div>
            </div>
          )}
        </>
      )}

      {/* ── REPORT VIEW ── */}
      {showReport && hasGraph && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* No issues state */}
            {!hasIssues && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <p className="text-xs text-emerald-500/90">
                  No code smells detected — your code looks clean!
                </p>
              </div>
            )}

            {/* Code smells */}
            {hasIssues && <CodeSmellsCard smells={codeSmells} />}

            {/* Refactoring suggestions — only when smells exist */}
            {hasIssues &&
              refactoringSuggestions &&
              refactoringSuggestions.length > 0 && (
                <RefactoringSuggestionsCard
                  suggestions={refactoringSuggestions}
                  sessionId={sessionId ?? ""}
                  functionName={functionName ?? ""}
                />
              )}

            {/* Advanced metrics — always shown */}
            <AdvancedMetricsCard halstead={halstead} dataFlow={dataFlow} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
