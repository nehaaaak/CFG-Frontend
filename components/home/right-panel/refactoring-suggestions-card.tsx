import { useState } from "react";
import { useRefactorSuggest } from "@/hooks/use-refactor-suggest";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
// import { CFG_QUERY_KEY } from "@/hooks/use-cfg";
// import { useQueryClient } from "@tanstack/react-query";
import TooltipWrapper from "@/components/tooltip/tooltip-wrapper";
import {
  Wrench,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader2,
} from "lucide-react";

type Suggestion = {
  priority: string;
  refactoring: string;
  reason: string;
  benefit: string;
  steps: string[];
};

type Props = {
  suggestions: Suggestion[];
  sessionId: string;
  functionName: string;
};

const priorityColor = {
  high: "text-red-500 bg-red-500/10 border-red-500/20",
  medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  low: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
};

export function RefactoringSuggestionsCard({
  suggestions,
  sessionId,
  functionName,
}: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isAuthenticated } = useCurrentUser();

  const { data, isFetching, isError, error } = useRefactorSuggest(
    shouldFetch ? { session_id: sessionId, function_name: functionName } : null,
  );

  const errorMessage =
    (error as any)?.response?.data?.detail ?? "Failed to fetch suggestions.";

  const aiSuggestions: Suggestion[] = data?.parsed_suggestions
    ? data.parsed_suggestions.map((s: any) => ({
        priority: "medium",
        refactoring: s.title,
        reason: s.description,
        benefit: "",
        steps: [],
      }))
    : [];

  const allSuggestions = [...suggestions, ...aiSuggestions];

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
            Refactoring Suggestions
          </p>
        </div>
        <TooltipWrapper
          tooltip="Login to use this feature"
          showTooltip={!isAuthenticated}
        >
          <button
            disabled={!isAuthenticated || isFetching || !!data}
            onClick={() => setShouldFetch(true)}
            className="group flex items-center h-7 px-2 rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
          >
            {isFetching ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-foreground group-hover:text-black transition-colors duration-300" />
                <span className="w-0 group-hover:w-[90px] overflow-hidden whitespace-nowrap text-xs font-medium text-black transition-all duration-300 ease-in-out group-hover:ml-1.5 ml-0">
                  AI Suggestions
                </span>
              </>
            )}
          </button>
        </TooltipWrapper>
      </div>
      {/* <div className="flex items-center gap-2">
        <Wrench className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
          Refactoring Suggestions
        </p>
      </div> */}

      <div className="space-y-2">
        {allSuggestions.map((s, i) => {
          const isOpen = expanded === i;
          const pc =
            priorityColor[s.priority as keyof typeof priorityColor] ??
            priorityColor.low;
          return (
            <div
              key={i}
              className="rounded-lg border border-border/40 bg-background/40 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs text-muted-foreground font-mono shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-foreground/90 truncate">
                    {s.refactoring}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${pc}`}
                  >
                    {s.priority}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 space-y-2.5 border-t border-border/30">
                  <p className="text-xs text-muted-foreground pt-2">
                    {s.reason}
                  </p>
                  <p className="text-xs text-emerald-500/80">
                    <span className="font-medium">Benefit:</span> {s.benefit}
                  </p>
                  {s.steps?.length > 0 && (
                    <ol className="space-y-1">
                      {s.steps.map((step, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-xs text-muted-foreground"
                        >
                          <span className="font-mono text-muted-foreground/50 shrink-0">
                            {j + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {isError && <p className="text-xs text-red-500 px-1">{errorMessage}</p>}
      </div>
    </div>
  );
}
