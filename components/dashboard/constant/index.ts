import { Code2, GitBranch, Sparkles, Wand2 } from "lucide-react";

export const QUOTA_TOTAL = 2;

export const QUOTA_CONFIG = [
  {
    key: "node_explain_remaining" as const,
    title: "Node Explain",
    icon: Sparkles,
  },
  {
    key: "path_explain_remaining" as const,
    title: "Path Explain",
    icon: GitBranch,
  },
  {
    key: "refactor_suggest_remaining" as const,
    title: "Refactor Suggest",
    icon: Wand2,
  },
  {
    key: "refactor_code_remaining" as const,
    title: "Refactor Code",
    icon: Code2,
  },
];

export type QuotaData = {
  node_explain_remaining: number;
  path_explain_remaining: number;
  refactor_suggest_remaining: number;
  refactor_code_remaining: number;
  reset_date: string;
};
