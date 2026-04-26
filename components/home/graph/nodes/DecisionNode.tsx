"use client";

import { useState } from "react";
import { Handle, Position } from "reactflow";

export default function DecisionNode({ data }: any) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={() => setVisible((v) => !v)}
    >
      {visible && data?.codeStatements?.length > 0 && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 -top-2 -translate-y-full bg-zinc-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap shadow-lg pointer-events-none">
          {data?.codeStatements.map((stmt: string, i: number) => (
            <p key={i}>{stmt}</p>
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-800" />
        </div>
      )}

      <div className="w-36 bg-black border border-yellow-400 text-white flex items-center justify-center px-4 py-2 rounded">
        <div className="text-xs text-center">{data?.label ?? "--"}</div>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </div>
  );
}
