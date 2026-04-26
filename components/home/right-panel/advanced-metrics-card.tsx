import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Halstead = {
  vocabulary: number;
  length: number;
  calculated_length: number;
  volume: number;
  difficulty: number;
  effort: number;
  time_to_program: number;
  bugs_delivered: number;
};

type DataFlow = {
  reaching_definitions_count: number;
  live_variables_count: number;
  def_use_chains_count: number;
  unused_variables: { block: number; variable: string }[];
};

type Props = {
  halstead?: Halstead;
  dataFlow?: DataFlow;
};

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono font-medium text-foreground/80">
        {value}
      </span>
    </div>
  );
}

function Section({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
          {label}
        </span>
        {open ? (
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-3 pb-3 border-t border-border/30">{children}</div>
      )}
    </div>
  );
}

export function AdvancedMetricsCard({ halstead, dataFlow }: Props) {
  if (!halstead && !dataFlow) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
        Advanced Metrics
      </p>

      <div className="space-y-2">
        {dataFlow && (
          <Section label="Data Flow Analysis" defaultOpen>
            <div className="pt-2 space-y-0">
              <MetricRow
                label="Reaching Definitions"
                value={dataFlow.reaching_definitions_count}
              />
              <MetricRow
                label="Live Variables"
                value={dataFlow.live_variables_count}
              />
              <MetricRow
                label="Def-Use Chains"
                value={dataFlow.def_use_chains_count}
              />
            </div>
            {dataFlow.unused_variables?.length > 0 && (
              <div className="mt-2.5 rounded-lg bg-amber-500/5 border border-amber-500/15 px-3 py-2 space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-500/80">
                  Unused Variables
                </p>
                {dataFlow.unused_variables.map((uv, i) => (
                  <p
                    key={i}
                    className="text-xs text-muted-foreground font-mono"
                  >
                    <span className="text-amber-500/70">{uv.variable}</span>
                    <span className="text-muted-foreground/50">
                      {" "}
                      — block {uv.block}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </Section>
        )}

        {halstead && (
          <Section label="Halstead Metrics">
            <div className="pt-2 space-y-0">
              <MetricRow label="Vocabulary" value={halstead.vocabulary} />
              <MetricRow label="Program Length" value={halstead.length} />
              <MetricRow label="Volume" value={halstead.volume.toFixed(2)} />
              <MetricRow
                label="Difficulty"
                value={halstead.difficulty.toFixed(2)}
              />
              <MetricRow label="Effort" value={halstead.effort.toFixed(2)} />
              <MetricRow
                label="Time to Program"
                value={`${halstead.time_to_program.toFixed(1)} sec`}
              />
              <MetricRow
                label="Estimated Bugs"
                value={halstead.bugs_delivered.toFixed(3)}
              />
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
