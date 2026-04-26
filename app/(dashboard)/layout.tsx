"use client";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r flex-col">
        <DashboardSidebar onNavigate={() => {}} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-3 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
