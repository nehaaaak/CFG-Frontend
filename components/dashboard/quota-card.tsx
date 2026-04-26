import { LucideIcon } from "lucide-react";

type QuotaCardProps = {
  title: string;
  remaining: number;
  total: number;
  icon: LucideIcon;
};

export const QuotaCard = ({
  title,
  remaining,
  total,
  icon: Icon,
}: QuotaCardProps) => {
  const used = total - remaining;
  const percentage = Math.round((remaining / total) * 100);

  const color =
    percentage === 0
      ? "text-red-500"
      : percentage <= 50
        ? "text-orange-500"
        : "text-emerald-500";

  const barColor =
    percentage === 0
      ? "bg-red-500"
      : percentage <= 50
        ? "bg-orange-500"
        : "bg-emerald-500";

  return (
    <div className="rounded-xl border bg-background/60 backdrop-blur p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">{title}</p>
        </div>
        <span className={`text-2xl font-bold ${color}`}>{remaining}</span>
      </div>

      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>{used} used</span>
          <span>{total} total</span>
        </div>
      </div>
    </div>
  );
};
