import dagre from "dagre";
import type { Node, Edge } from "reactflow";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export function layoutGraph(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB",
) {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 180, height: 60 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const pos = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x - 90,
        y: pos.y - 30,
      },
    };
  });
}
