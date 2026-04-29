"use client";

import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/editor/code-editor";
import { GitBranch, Play, Sparkles, FileCode } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SAMPLE_CODES } from "@/data/sample-code";

const WORDS = ["control flow", "execution", "code paths", "program flow"];

type HeroEditorProps = {
  code: string;
  setCode: (value: string) => void;
  setSampleOpen: (value: boolean) => void;
  handleGenerateCFG: () => void;
  isPending: boolean;
};

export default function HeroEditor({
  code,
  setCode,
  setSampleOpen,
  handleGenerateCFG,
  isPending,
}: HeroEditorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const SUGGESTIONS = SAMPLE_CODES.filter(
    (s) => "suggestion" in s && s.suggestion,
  );

  return (
    <motion.div
      className="relative z-10 w-full max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      {/* Title */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GitBranch className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
            Code Flow
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2 capitalize text-center">
          Visualize your{" "}
          <span className="relative inline-block min-w-35 h-[1.2em] align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 top-0 text-primary whitespace-nowrap"
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Paste Python code below and generate an interactive control flow graph
        </p>
      </div>

      {/* Editor card */}
      <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/40">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            main.py
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs gap-1 text-muted-foreground"
            onClick={() => setSampleOpen(true)}
          >
            <FileCode className="h-3 w-3" />
            Samples
          </Button>
        </div>

        <div style={{ height: "240px" }}>
          <CodeEditor value={code} onChange={setCode} />
        </div>
      </div>

      {/* Quick suggestions */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Try:
        </span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setCode(s.code);
            }}
            className="text-xs px-3 py-1 rounded-full border border-border hover:bg-muted transition-colors font-mono"
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <Button
        className="w-full mt-5 rounded-md"
        size="lg"
        disabled={!code.trim() || isPending}
        onClick={handleGenerateCFG}
      >
        <Play className="mr-2 h-4 w-4" />
        Generate Control Flow Graph
      </Button>
    </motion.div>
  );
}
