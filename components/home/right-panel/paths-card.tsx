// import { Button } from "@/components/ui/button";
// import { Sparkles } from "lucide-react";
// import { useState } from "react";

// type Props = {
//   paths: string[][];
//   onExplainPath: (path: string[], index: number) => void;
// };

// const formatPath = (path: string[]) =>
//   path
//     .map((step) => {
//       const match = step.match(/^(B\d+):/);
//       return match ? match[1] : step;
//     })
//     .join(" → ");

// export function PathsCard({ paths, onExplainPath }: Props) {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   if (!paths?.length) return null;

//   return (
//     <div className="rounded-xl border bg-background/60 backdrop-blur p-4 space-y-3">
//       <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
//         Execution Paths ({paths.length})
//       </p>
//       <div className="space-y-2">
//         {paths.map((path, i) => (
//           <div
//             key={i}
//             className="rounded-lg bg-muted/40 border px-3 py-2.5 space-y-1"
//             onMouseEnter={() => setHoveredIndex(i)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <div className="flex items-center justify-between">
//               <p className="text-[11px] font-medium text-orange-500">
//                 Path {i + 1}
//               </p>
//               {hoveredIndex === i && (
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   className="h-6 px-2 text-[11px] gap-1 text-orange-500 hover:text-orange-400 hover:bg-orange-500/10"
//                   onClick={() => onExplainPath(path, i)}
//                 >
//                   <Sparkles className="h-3 w-3" />
//                   Explain
//                 </Button>
//               )}
//             </div>
//             <p className="text-xs font-mono text-muted-foreground leading-relaxed">
//               {formatPath(path)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  paths: string[][];
  onExplainPath: (path: string[], index: number) => void;
  activePath?: number | null;
};

const formatPath = (path: string[]) =>
  path
    .map((step) => {
      const match = step.match(/^(B\d+):/);
      return match ? match[1] : step;
    })
    .join(" → ");

export function PathsCard({ paths, onExplainPath, activePath }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!paths?.length) return null;

  return (
    <div className="rounded-xl border bg-background/60 backdrop-blur p-4 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Execution Paths ({paths.length})
      </p>
      <div className="space-y-2">
        {paths.map((path, i) => (
          <div
            key={i}
            className={`relative rounded-lg border px-3 py-2.5 transition-colors cursor-default
              ${
                activePath === i
                  ? "border-orange-500/40 bg-orange-500/5"
                  : "bg-muted/40 border-transparent hover:border-orange-500/20 hover:bg-muted/60"
              }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-orange-500">
                Path {i + 1}
              </p>
              <Button
                size="sm"
                variant="ghost"
                className={`h-6 px-2 text-[11px] gap-1 text-orange-500 hover:text-orange-400 hover:bg-orange-500/10 transition-opacity
                  ${hoveredIndex === i || activePath === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => onExplainPath(path, i)}
              >
                <Sparkles className="h-3 w-3" />
                Explain
              </Button>
            </div>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              {formatPath(path)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
