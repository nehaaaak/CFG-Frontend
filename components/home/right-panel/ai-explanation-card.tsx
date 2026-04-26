import { Bot } from "lucide-react";

type Props = {
  explanation: string;
};

export function AIExplanationCard({ explanation }: Props) {
  if (!explanation) return null;

  return (
    <div className="rounded-xl border border-orange-500/15 bg-orange-500/5 dark:border-orange-500/10 dark:bg-orange-500/4 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4 text-orange-500" />
        <p className="text-xs font-medium text-orange-500">AI Summary</p>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {explanation}
      </p>
    </div>
  );
}
