"use client";

import { cn } from "@/lib/utils";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useMemo } from "react";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  className?: string;
};

const CodeEditor = ({
  value,
  onChange,
  readOnly = false,
  className,
}: CodeEditorProps) => {
  const { resolvedTheme } = useTheme();

  const monacoTheme = useMemo(
    () => (resolvedTheme === "light" ? "vs-light" : "vs-dark"),
    [resolvedTheme],
  );
  return (
    <div className={cn("h-full w-full", className)}>
      <Editor
        height="100%"
        language="python"
        value={value}
        theme={monacoTheme}
        onChange={(v) => onChange(v ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly,
          placeholder: "Paste or write Python code here to generate CFG...",
        }}
      />
    </div>
  );
};

export default CodeEditor;
