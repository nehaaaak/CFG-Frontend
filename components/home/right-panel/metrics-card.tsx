import { cn } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

type Props = {
  complexity: number;
  nodes: number;
  edges: number;
  decisions: number;
  loops: number;
  maxNestingDepth: number;
  complexityCategory: string;
  riskLevel: string;
};

const riskConfig = (risk: string) => {
  const r = risk?.toLowerCase();
  if (r?.includes("low"))
    return {
      icon: ShieldCheck,
      className: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    };
  if (r?.includes("medium"))
    return {
      icon: ShieldAlert,
      className: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    };
  return {
    icon: ShieldX,
    className: "text-red-500 bg-red-500/10 border-red-500/20",
  };
};

const complexityColor = (cat: string) => {
  const c = cat?.toLowerCase();
  if (c === "low") return "bg-emerald-500/10 text-emerald-400";
  if (c === "medium") return "bg-amber-500/10 text-amber-400";
  return "bg-red-500/10 text-red-400";
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    <span className="text-base font-semibold">{value}</span>
  </div>
);

export function MetricsCard({
  complexity,
  nodes,
  edges,
  decisions,
  loops,
  maxNestingDepth,
  complexityCategory,
  riskLevel,
}: Props) {
  const risk = riskConfig(riskLevel);
  const RiskIcon = risk.icon;

  return (
    <div className="rounded-xl border bg-background/60 backdrop-blur p-4 space-y-4">
      {/* Complexity row */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold tracking-tight">
            {complexity}
          </span>
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              complexityColor(complexityCategory),
            )}
          >
            {complexityCategory} complexity
          </span>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border",
            risk.className,
          )}
        >
          <RiskIcon className="h-3.5 w-3.5" />
          {riskLevel}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* All stats */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-3">
        <Stat label="Nodes" value={nodes} />
        <Stat label="Edges" value={edges} />
        <Stat label="Decisions" value={decisions} />
        <Stat label="Loops" value={loops} />
        <Stat label="Max Depth" value={maxNestingDepth} />
      </div>
    </div>
  );
}
