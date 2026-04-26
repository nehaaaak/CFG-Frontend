import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
  tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  tag?: "section" | "div";
}) => {
  const Component = tag;
  return (
    <Component
      className={cn(
        "max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-6 transition-all duration-300",
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
