import { ShieldAlert, AlertTriangle, Info } from "lucide-react";

type CodeSmell = {
  type: string;
  severity: string;
  message: string;
  block_id: number;
  location: string;
};

type Props = {
  smells: CodeSmell[];
};

const severityConfig = {
  high: {
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-500/8",
    border: "border-red-500/15",
    dot: "bg-red-500",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/8",
    border: "border-amber-500/15",
    dot: "bg-amber-500",
  },
  low: {
    icon: Info,
    color: "text-yellow-500/80",
    bg: "bg-yellow-500/5",
    border: "border-yellow-500/10",
    dot: "bg-yellow-500",
  },
};

export function CodeSmellsCard({ smells }: Props) {
  return (
    <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-red-500" />
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">
            Code Smells
          </p>
        </div>
        <span className="text-xs text-red-500/70 font-mono bg-red-500/10 px-2 py-0.5 rounded-full">
          {smells.length} issue{smells.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-2">
        {smells.map((smell, i) => {
          const cfg =
            severityConfig[smell.severity as keyof typeof severityConfig] ??
            severityConfig.low;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 px-3 py-2.5 rounded-lg border ${cfg.bg} ${cfg.border}`}
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${cfg.dot}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/80">{smell.message}</p>
                <p
                  className={`text-[10px] mt-0.5 font-mono uppercase tracking-wide ${cfg.color} opacity-70`}
                >
                  {smell.type.replace(/_/g, " ")} · {smell.severity} ·{" "}
                  {smell.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
