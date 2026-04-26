import { cn } from "@/lib/utils";

type CFGStatsProps = {
  complexity: number;
  nodes: number;
  edges: number;
};

export function CFGStats({ complexity, nodes, edges }: CFGStatsProps) {
  return (
    <div className="rounded-xl border bg-background/60 backdrop-blur px-6 py-5">
      <div className="text-sm text-muted-foreground mb-3">
        Cyclomatic Complexity
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-semibold tracking-tight">
            {complexity}
          </span>

          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              complexity <= 5 && "bg-emerald-500/10 text-emerald-400",
              complexity > 5 &&
                complexity <= 10 &&
                "bg-yellow-500/10 text-yellow-400",
              complexity > 10 && "bg-red-500/10 text-red-400"
            )}
          >
            {complexity <= 5
              ? "Low complexity"
              : complexity <= 10
              ? "Moderate"
              : "High complexity"}
          </span>
        </div>

        {/* Meta Stats */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="text-center">
            <div className="font-medium text-foreground">{nodes}</div>
            <div className="text-xs">Nodes</div>
          </div>

          <div className="text-center">
            <div className="font-medium text-foreground">{edges}</div>
            <div className="text-xs">Edges</div>
          </div>
        </div>
      </div>
    </div>
  );
}
