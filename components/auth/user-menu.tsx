"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { getInitials } from "@/lib/utils";
import { useLogout } from "@/hooks/auth/use-logout";
import ConfirmDialog from "../shared/confirm-dialog";
import { useState } from "react";
// import Link from "next/link";

export default function UserMenu() {
  const { user } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!user) return null;

  const name = user.full_name ?? "--";
  const email = user.email;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="rounded-full w-10 h-10">
          <Button variant="outline">{getInitials(name)}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>

          {/* <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-red-500"
            onClick={() => setShowLogoutDialog(true)}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        variant="destructive"
        isLoading={isPending}
        onConfirm={() => logout()}
      />
    </>
  );
}
