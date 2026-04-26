import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/editor/code-editor";
import { Code2, FileCode, Play, Wand2 } from "lucide-react";
import CardHeader from "@/components/shared/card-header";
import { NodeExplanationPanel } from "./node-explanation-panel";
import { Node } from "reactflow";
import { PathExplanationPanel } from "./path-explanation-panel";
import TooltipWrapper from "@/components/tooltip/tooltip-wrapper";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useRouter } from "next/navigation";

type LeftPanelProps = {
  code: string;
  setCode: (value: string) => void;
  setSampleOpen: (value: boolean) => void;
  toggleEditorVisibility: () => void;
  isEditorVisible: boolean;
  handleGenerateCFG: () => void;
  handleImproveCode: () => void;
  isPending: boolean;
  isCodeUnchanged: boolean;
  selectedNode: Node | null;
  onClearSelectedNode: () => void;
  selectedPath: { path: string[]; index: number } | null;
  onClearSelectedPath: () => void;
  sessionId: string;
  functionName: string;
};

const LeftPanel = ({
  setSampleOpen,
  code,
  setCode,
  // toggleEditorVisibility,
  // isEditorVisible,
  handleGenerateCFG,
  handleImproveCode,
  isPending,
  isCodeUnchanged,
  selectedNode,
  onClearSelectedNode,
  selectedPath,
  onClearSelectedPath,
  sessionId,
  functionName,
}: LeftPanelProps) => {
  const { isAuthenticated } = useCurrentUser();
  const router = useRouter();

  const showNodePanel = !!selectedNode;
  const showPathPanel = !selectedNode && !!selectedPath;

  const headerTitle = showNodePanel
    ? "Node Inspector"
    : showPathPanel
      ? "Path Inspector"
      : "Source Code";

  const headerDesc = showNodePanel
    ? "AI-powered node explanation"
    : showPathPanel
      ? "AI-powered path explanation"
      : "Enter or paste Python code";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <CardHeader icon={Code2} title={headerTitle} description={headerDesc} />

        {!showNodePanel && !showPathPanel && (
          <div className="flex items-center gap-2">
            <TooltipWrapper
              tooltip="Login to use this feature"
              showTooltip={!isAuthenticated}
            >
              <button
                onClick={
                  isAuthenticated
                    ? handleImproveCode
                    : () => router.push("/login")
                }
                className="group flex items-center cursor-pointer h-8 px-2 rounded-md hover:bg-white transition-all duration-300 ease-in-out"
              >
                <Wand2 className="h-4 w-4 shrink-0 text-foreground group-hover:text-black transition-colors duration-300" />
                <span className="w-0 group-hover:w-[110px] overflow-hidden whitespace-nowrap text-xs font-medium text-black transition-all duration-300 ease-in-out group-hover:ml-1.5 ml-0">
                  AI Improve Code
                </span>
              </button>
            </TooltipWrapper>

            {/* Load sample */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSampleOpen(true)}
              title="Sample Code"
            >
              <FileCode className="h-4 w-4" />
            </Button>

            {/* Hide / Show */}
            {/* <Button variant="ghost" size="icon" onClick={toggleEditorVisibility}>
            {isEditorVisible ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button> */}
          </div>
        )}
      </div>

      {showNodePanel ? (
        <NodeExplanationPanel
          node={selectedNode as any}
          sessionId={sessionId}
          functionName={functionName}
          onClose={onClearSelectedNode}
        />
      ) : showPathPanel ? (
        <PathExplanationPanel
          path={selectedPath.path}
          pathIndex={selectedPath.index}
          sessionId={sessionId}
          functionName={functionName}
          onClose={onClearSelectedPath}
        />
      ) : (
        <>
          <div className="flex-1">
            <CodeEditor value={code} onChange={setCode} />
          </div>
          <div className="border-t px-4 py-3 sticky bottom-0 bg-background">
            <Button
              className="w-full rounded-sm bg-primary/10 text-primary dark:hover:bg-primary/20"
              disabled={!code.trim() || isPending || isCodeUnchanged}
              onClick={handleGenerateCFG}
            >
              <Play className="mr-2 h-4 w-4" />
              Generate CFG
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftPanel;
