import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  BackgroundVariant,
} from "reactflow";
// @ts-ignore
import "reactflow/dist/style.css";
import type { UIGraph } from "@/types/cfg";
import { layoutGraph } from "./layout";

// node components
import StartNode from "./nodes/StartNode";
import DecisionNode from "./nodes/DecisionNode";
import ProcessNode from "./nodes/ProcessNode";
import EndNode from "./nodes/EndNode";
import { useTheme } from "next-themes";

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  decision: DecisionNode,
  process: ProcessNode,
};

type CFGGraphProps = {
  data?: UIGraph | null;
  selectedNodeId?: string | null;
  onNodeClick?: (node: Node) => void;
};

export default function CFGGraph({
  data,
  selectedNodeId,
  onNodeClick,
}: CFGGraphProps) {
  const { theme } = useTheme();

  if (!data) return null;

  const rawNodes: Node[] = layoutGraph(data.nodes, data.edges);
  const nodes: Node[] = rawNodes.map((n) => ({
    ...n,
    style: {
      ...n.style,
      ...(selectedNodeId === n.id
        ? {
            border: "2px solid rgb(249 115 22)",
            borderRadius: 6,
            zIndex: 10,
          }
        : {}),
    },
  }));
  // const nodes: Node[] = rawNodes.map((n) => ({
  //   ...n,
  //   style: {
  //     ...n.style,
  //     ...(selectedNodeId === n.id
  //       ? { outline: "2px solid hsl(var(--primary))", borderRadius: 6 }
  //       : {}),
  //   },
  // }));

  const edges: Edge[] = data.edges;

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={(_event, node) => onNodeClick?.(node)}
        className="bg-transparent h-full"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color={theme === "dark" ? "#374151" : "#cbd5e1"}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}
