import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useExplainPath } from "@/hooks/use-explain-path";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type PathExplanationPanelProps = {
  path: string[];
  pathIndex: number;
  sessionId: string;
  functionName: string;
  onClose: () => void;
};

const formatPath = (path: string[]) =>
  path
    .map((step) => {
      const match = step.match(/^(B\d+):/);
      return match ? match[1] : step;
    })
    .join(" → ");

const extractNodeIds = (path: string[]) =>
  path.map((step) => {
    const match = step.match(/^(B\d+):/);
    return match ? match[1] : step;
  });

export const PathExplanationPanel = ({
  path,
  pathIndex,
  sessionId,
  functionName,
  onClose,
}: PathExplanationPanelProps) => {
  const router = useRouter();
  const { isAuthenticated } = useCurrentUser();
  const [shouldExplain, setShouldExplain] = useState(false);

  useEffect(() => {
    setShouldExplain(false);
  }, [pathIndex]);

  const { data, isFetching, isError, error } = useExplainPath(
    shouldExplain
      ? {
          session_id: sessionId,
          function_name: functionName,
          path_node_ids: extractNodeIds(path),
        }
      : null,
  );

  const errorMessage =
    (error as any)?.response?.data?.detail ??
    "Failed to fetch explanation. Try again.";

  return (
    <div className="flex flex-col h-full">
      {/* Path detail header */}
      <div className="border-b px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Selected Path
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onClose}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="rounded-md bg-muted/50 border px-3 py-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-orange-500">
              Path {pathIndex + 1}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground border rounded px-2 py-0.5">
              {path.length} nodes
            </span>
          </div>
          <div className="pt-1.5 border-t">
            <p className="text-sm font-mono text-foreground/90 leading-relaxed">
              {formatPath(path)}
            </p>
          </div>
        </div>
      </div>

      {/* Action area */}
      <div className="px-4 py-3 border-b shrink-0">
        {!isAuthenticated ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Log in to get an AI explanation of this path.
            </p>
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={() => router.push("/login")}
            >
              <LogIn className="h-3.5 w-3.5" />
              Log in
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full gap-2"
            disabled={isFetching || !!data}
            onClick={() => setShouldExplain(true)}
          >
            {isFetching ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Explaining…
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                {data ? "Explained" : "Explain Path"}
              </>
            )}
          </Button>
        )}
      </div>

      {/* Explanation output */}
      {(isFetching || data || isError) && (
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-4 py-3">
            {isFetching && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                Generating explanation…
              </div>
            )}

            {isError && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                    AI Explanation
                  </span>
                </div>
                <div className="relative rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3.5">
                  <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />
                  <p className="text-sm leading-7 text-foreground/85 whitespace-pre-wrap">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {data?.explanation && (
              <div className="space-y-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                    AI Explanation
                  </span>
                </div>
                <div className="relative rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3.5">
                  <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />
                  <p className="text-sm leading-7 text-foreground/85 whitespace-pre-wrap">
                    {data.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
