"use client";

import { useRefactorCode } from "@/hooks/use-refactor-code";
import CodeEditor from "@/components/editor/code-editor";
import { Loader2, Copy, Check, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ImprovedCodePanelProps = {
  sessionId: string;
  functionName: string;
  onCompareCFG: (code: string) => void;
};

export const ImprovedCodePanel = ({
  sessionId,
  functionName,
  onCompareCFG,
}: ImprovedCodePanelProps) => {
  const [copied, setCopied] = useState(false);

  const { data, isFetching, isError, error } = useRefactorCode(
    sessionId && functionName
      ? { session_id: sessionId, function_name: functionName }
      : null,
  );

  const errorMessage =
    (error as any)?.response?.data?.detail ?? "Failed to improve code.";

  const handleCopy = () => {
    if (!data?.refactored_code) return;
    navigator.clipboard.writeText(data.refactored_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Improved code editor */}
      {/* <div className="flex-1 min-h-0 relative"> */}
      <div className="h-75 min-h-0 relative overflow-hidden">
        {isFetching && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Loader2 className="h-4 w-4 animate-spin" />
              Improving code…
            </div>
          </div>
        )}

        {isError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3.5 max-w-sm mx-4">
              <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />
              <p className="text-sm text-foreground/85">{errorMessage}</p>
            </div>
          </div>
        )}

        {data?.refactored_code && (
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 bg-background/80 backdrop-blur border"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        )}

        <CodeEditor
          value={data?.refactored_code ?? ""}
          onChange={() => {}}
          readOnly
          className="h-full overflow-auto"
        />
      </div>

      {/* Changes section */}
      {data?.changes && (
        <div className="border-t shrink-0 px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Changes Made
            </p>
          </div>
          <div className="relative rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3.5">
            <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-orange-500/40 to-transparent" />
            <p className="text-sm leading-7 text-foreground/85 whitespace-pre-wrap">
              {data.changes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
