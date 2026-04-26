"use client";

import { ModeToggler } from "./mode-toggler";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "./logo";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import UserMenu from "../auth/user-menu";
import { UserMenuSkeleton } from "../skeleton/user-skeleton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AUTHLIST = [
  {
    label: "Log in",
    href: "/login",
  },
];

const Header = () => {
  const { user, isLoading } = useCurrentUser();
  const pathname = usePathname();

  const isDashboard = !["/", "/login", "/register"].includes(pathname);

  return (
    <header className="border-b">
      <div
        // className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between"
        className={cn(
          "px-6 py-3 flex items-center justify-between",
          !isDashboard && "max-w-7xl mx-auto",
        )}
      >
        <Logo />
        <div className="flex items-center gap-2.5">
          {isLoading ? (
            <UserMenuSkeleton />
          ) : user ? (
            <>
              {/* <Button asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button> */}
              <UserMenu />
            </>
          ) : (
            AUTHLIST.map((list) => (
              <Button variant="outline" key={list.label} asChild>
                <Link href={list.href}>{list.label}</Link>
              </Button>
            ))
          )}
          <ModeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
