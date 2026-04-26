export type CFGNode = {
  id: number;
  label: string;
  type: string;
  x: number;
  y: number;
  line_number: number;
  block_number: number | null; // add this
  code_statements: string[]; // add this
};

export type CFGEdge = {
  from_node: number;
  to_node: number;
  from?: number;
  to?: number;
  label?: string;
};

export type CFGFunction = {
  name: string;
  nodes: CFGNode[];
  edges: CFGEdge[];
  cc: number;
  metrics: Record<string, number>;
  paths: string[][];
};

export type CFGResponse = {
  success: boolean;
  functions: CFGFunction[];
  overall_cc: number;
  error?: string;
};

export type UIGraph = {
  nodes: {
    id: string;
    position: { x: number; y: number };
    data: {
      label: string;
      line: number;
      type: string;
    };
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    label?: string;
    type?: string; // add
    labelStyle?: object; // add
    labelBgStyle?: object; // add
  }[];
};
