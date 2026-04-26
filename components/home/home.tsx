"use client";

import LeftPanel from "@/components/home/left-panel/left-panel";
import RightPanel from "@/components/home/right-panel/right-panel";
import Container from "@/components/shared/container";
import { useHomeCFG } from "@/hooks/use-home-cfg";
import { cn } from "@/lib/utils";
import React, { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "./landing";
import type { Node } from "reactflow";
import { ImprovedCodePanel } from "@/components/home/improved-code-panel";
import { ExternalLink } from "lucide-react";
import CardHeader from "@/components/shared/card-header";
import { GitBranch } from "lucide-react";
import { Button } from "../ui/button";
import { CompareCFGView } from "./compare-cfg-view";

const SampleDialog = lazy(() => import("@/components/dialog/sample-dialog"));

const Home = () => {
  const {
    code,
    setCode,
    sampleOpen,
    setSampleOpen,
    isEditorVisible,
    toggleEditorVisibility,
    handleGenerateCFG,
    handleImproveCode,
    cfgData,
    cfgStats,
    paths,
    ai_explanation,
    codeSmells,
    refactoringSuggestions,
    halstead,
    dataFlow,
    isPending,
    isSuccess,
    isError,
    sessionId,
    functionName,
    hasGenerated,
    isCodeUnchanged,
    showImprovedCode,
    handleCloseImprovedCode,
  } = useHomeCFG();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showCompareCFG, setShowCompareCFG] = useState(false);
  const [selectedPath, setSelectedPath] = useState<{
    path: string[];
    index: number;
  } | null>(null);

  const hasStarted = hasGenerated || isSuccess || isPending || isError;

  const handleNodeSelect = (node: Node) => {
    setSelectedPath(null);
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  };

  const handleClearSelectedNode = () => setSelectedNode(null);

  const handleExplainPath = (path: string[], index: number) => {
    setSelectedNode(null);
    setSelectedPath({ path, index });
  };

  const handleClearSelectedPath = () => setSelectedPath(null);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* added overflow-hidden */}
      <Suspense fallback={<div className="fixed inset-0" />}>
        <SampleDialog
          open={sampleOpen}
          onOpenChange={setSampleOpen}
          onSelect={setCode}
        />
      </Suspense>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <Landing
            code={code}
            setCode={setCode}
            setSampleOpen={setSampleOpen}
            handleGenerateCFG={handleGenerateCFG}
            isPending={isPending}
          />
        ) : (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-0 flex flex-col overflow-hidden"
          >
            <Container
              className={cn(
                "flex-1 min-h-0 grid gap-6",
                showCompareCFG
                  ? "grid-cols-1"
                  : isEditorVisible
                    ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
                    : "grid-cols-1",
              )}
            >
              {!showCompareCFG && (
                <Section
                  className={cn(
                    "min-h-0 transition-all duration-300 overflow-hidden",
                    isEditorVisible
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none lg:max-w-0",
                  )}
                >
                  <LeftPanel
                    setSampleOpen={setSampleOpen}
                    code={code}
                    setCode={setCode}
                    toggleEditorVisibility={toggleEditorVisibility}
                    isEditorVisible={isEditorVisible}
                    handleGenerateCFG={handleGenerateCFG}
                    handleImproveCode={handleImproveCode}
                    isPending={isPending}
                    selectedNode={selectedNode}
                    onClearSelectedNode={handleClearSelectedNode}
                    sessionId={sessionId}
                    functionName={functionName}
                    selectedPath={selectedPath}
                    onClearSelectedPath={handleClearSelectedPath}
                    isCodeUnchanged={isCodeUnchanged}
                  />
                </Section>
              )}

              {/* <Section className="min-h-0">
                {showImprovedCode ? (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
                      <CardHeader
                        icon={GitBranch}
                        title="Improved Code"
                        description="Improved Code to Jump"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs gap-1.5 cursor-pointer"
                        onClick={() => setShowCompareCFG(true)}
                        // onClick={() => {
                        //   // generate CFG for improved code — wire when ready
                        // }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Compare CFG
                      </Button>
                    </div>
                    <ImprovedCodePanel
                      sessionId={sessionId}
                      functionName={functionName}
                      onCompareCFG={(code) => {
                        handleCloseImprovedCode();
                        // optionally load the improved code into editor
                      }}
                    />
                  </div>
                ) : (
                  <RightPanel
                    isGenerating={isPending}
                    hasGraph={isSuccess}
                    data={cfgData}
                    stats={cfgStats}
                    toggleEditorVisibility={toggleEditorVisibility}
                    isEditorVisible={isEditorVisible}
                    aiExplanation={ai_explanation}
                    codeSmells={codeSmells}
                    refactoringSuggestions={refactoringSuggestions}
                    halstead={halstead}
                    dataFlow={dataFlow}
                    paths={paths}
                    selectedNodeId={selectedNode?.id ?? null}
                    onNodeSelect={handleNodeSelect}
                    onExplainPath={handleExplainPath}
                    activePath={selectedPath?.index ?? null}
                    sessionId={sessionId}
                    functionName={functionName}
                  />
                )}
              </Section> */}

              <Section className="min-h-0">
                {showCompareCFG ? (
                  <CompareCFGView
                    sessionId={sessionId}
                    functionName={functionName}
                    onBack={() => setShowCompareCFG(false)} // goes back to improved code
                  />
                ) : showImprovedCode ? (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
                      <CardHeader
                        icon={GitBranch}
                        title="Improved Code"
                        description="Improved Code to Jump"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs gap-1.5 cursor-pointer"
                        onClick={() => setShowCompareCFG(true)}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Compare CFG
                      </Button>
                    </div>
                    <ImprovedCodePanel
                      sessionId={sessionId}
                      functionName={functionName}
                      onCompareCFG={() => setShowCompareCFG(true)}
                    />
                  </div>
                ) : (
                  <RightPanel
                    isGenerating={isPending}
                    hasGraph={isSuccess}
                    data={cfgData}
                    stats={cfgStats}
                    toggleEditorVisibility={toggleEditorVisibility}
                    isEditorVisible={isEditorVisible}
                    aiExplanation={ai_explanation}
                    codeSmells={codeSmells}
                    refactoringSuggestions={refactoringSuggestions}
                    halstead={halstead}
                    dataFlow={dataFlow}
                    paths={paths}
                    selectedNodeId={selectedNode?.id ?? null}
                    onNodeSelect={handleNodeSelect}
                    onExplainPath={handleExplainPath}
                    activePath={selectedPath?.index ?? null}
                    sessionId={sessionId}
                    functionName={functionName}
                  />
                )}
              </Section>

              {/* <Section className="min-h-0">
                <RightPanel
                  isGenerating={isPending}
                  hasGraph={isSuccess}
                  data={cfgData}
                  stats={cfgStats}
                  toggleEditorVisibility={toggleEditorVisibility}
                  isEditorVisible={isEditorVisible}
                  aiExplanation={ai_explanation}
                  codeSmells={codeSmells}
                  refactoringSuggestions={refactoringSuggestions}
                  halstead={halstead}
                  dataFlow={dataFlow}
                  paths={paths}
                  selectedNodeId={selectedNode?.id ?? null}
                  onNodeSelect={handleNodeSelect}
                  onExplainPath={handleExplainPath}
                  activePath={selectedPath?.index ?? null}
                  sessionId={sessionId}
                  functionName={functionName}
                />
              </Section> */}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

const Section = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("border rounded-lg flex flex-col min-h-0", className)}>
    {children}
  </div>
);
