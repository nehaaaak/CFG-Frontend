"use client";

import { useTheme } from "next-themes";
import { Toaster } from "../ui/sonner";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface CustomToasterProps {
  position?: ToastPosition;
}

const CustomToaster = ({ position = "bottom-right" }: CustomToasterProps) => {
  const { theme } = useTheme();
  const safeTheme =
    theme === "dark" || theme === "light" || theme === "system"
      ? theme
      : "dark";

  return (
    <Toaster
      theme={safeTheme}
      position={position}
      richColors
      toastOptions={{
        duration: 4000,
      }}
    />
  );
};

export default CustomToaster;
