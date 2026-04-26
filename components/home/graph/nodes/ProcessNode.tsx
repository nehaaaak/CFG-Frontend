"use client";

import { useState } from "react";
import { Handle, Position } from "reactflow";

export default function ProcessNode({ data }: { data: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered((v) => !v)}
      className="relative px-4 py-2 rounded border border-gray-400 bg-white dark:bg-zinc-800 dark:border-zinc-500 min-w-30 text-center"
    >
      <Handle type="target" position={Position.Top} />

      <p className="text-sm font-medium text-black dark:text-white">
        {data?.label ?? "--"}
      </p>

      {hovered && data?.codeStatements?.length > 0 && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 -top-2 -translate-y-full bg-zinc-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap shadow-lg pointer-events-none">
          {data?.codeStatements.map((stmt: string, i: number) => (
            <p key={i}>{stmt}</p>
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-800" />
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
