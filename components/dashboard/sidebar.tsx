"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCFGHistory } from "@/hooks/use-cfg-history";
import { useCFGSession } from "@/hooks/use-cfg-session";
import { cn } from "@/lib/utils";
import { BarChart2, Clock, Loader2, User, GitBranch } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  onNavigate: () => void;
};

const NAV_ITEMS = [
  { label: "My Quota", href: "/dashboard", icon: BarChart2 },
  { label: "Profile", href: "/profile", icon: User },
];

export const DashboardSidebar = ({ onNavigate }: Props) => {
  const pathname = usePathname();
  const { data: sessions, isLoading } = useCFGHistory();
  const { loadSession, isLoading: loadingSession } = useCFGSession();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      {/* <div className="px-4 py-4 border-b shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-wide"
          onClick={onNavigate}
        >
          <GitBranch className="h-4 w-4" />
          CODE FLOW
        </Link>
      </div> */}

      {/* Nav */}
      <div className="px-3 py-3 space-y-0.5 border-b shrink-0">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === href
                ? "bg-muted font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      {/* Sessions */}
      <div className="flex-1 min-h-0 flex flex-col px-3 py-3">
        <div className="flex items-center gap-1.5 px-3 mb-2">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Recent Sessions
          </p>
        </div>

        <ScrollArea className="flex-1">
          {isLoading && (
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading sessions…
            </div>
          )}

          {!isLoading && (!sessions || sessions.length === 0) && (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              No sessions yet.
            </p>
          )}

          <div className="space-y-0.5">
            {sessions?.map(
              (session: {
                id: number;
                session_id: string;
                name: string;
                description: string;
                overall_cc: number;
                function_count: number;
                created_at: string;
              }) => (
                <button
                  key={session.id}
                  disabled={loadingSession}
                  onClick={() => {
                    loadSession(session.session_id);
                    onNavigate();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-md hover:bg-muted/50 transition-colors group"
                >
                  <p className="text-xs font-medium truncate group-hover:text-foreground text-foreground/80">
                    {session.name}
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-[11px] text-muted-foreground truncate max-w-[130px]">
                      {session.description}
                    </p>
                    <p className="text-[10px] text-muted-foreground shrink-0">
                      {formatDistanceToNow(new Date(session.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </button>
              ),
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
