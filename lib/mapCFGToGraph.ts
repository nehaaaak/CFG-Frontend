import { CFGFunction, UIGraph } from "@/types/cfg";

export const mapCFGToGraph = (fn: CFGFunction): UIGraph => {
  return {
    nodes: fn.nodes.map((n) => ({
      id: String(n.id),
      position: { x: n.x, y: n.y },
      // type: "cfgNode", // match custom node type name
      type: n.type,
      data: {
        label: n.block_number !== null ? `B${n.block_number}` : n.label, // just block number
        line: n.line_number,
        type: n.type,
        codeStatements: n.code_statements, // pass code statements
      },
    })),

    edges: fn.edges.map((e, idx) => ({
      id: `e-${idx}`,
      source: String(e.from_node || e.from),
      target: String(e.to_node || e.to),
      label: e.label || "", // keep label on edge
      type: "smoothstep", // dagre edge type
      labelStyle: { fill: "#fff", fontWeight: 600 }, // style label
      labelBgStyle: { fill: "transparent" }, // no background box
    })),
  };
};
