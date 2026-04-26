import { cn } from "@/lib/utils";
import { GitBranch } from "lucide-react";
import Link from "next/link";

const Logo = ({ size = "small" }: { size?: "small" | "large" }) => {
  return (
    <Link href="/">
      <div>
        <h2
          className={cn(
            "flex items-center gap-2 font-mono tracking-widest uppercase",
            size === "large" ? "text-2xl" : "",
          )}
        >
          <GitBranch
            className={cn(size === "small" ? "h-5 w-5" : "h-10 w-10")}
          />
          Code Flow
        </h2>
        {/* <p className="text-xs text-muted-foreground">
          Control Flow Graph Visualization
        </p> */}
      </div>
    </Link>
  );
};

export default Logo;
