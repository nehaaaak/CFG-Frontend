import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;

    // FastAPI structured error
    if (detail && typeof detail === "object") {
      const message = detail.message;
      const errors = detail.errors;

      if (Array.isArray(errors) && errors.length > 0) {
        return `${message}: ${errors.join(", ")}`;
      }

      if (message) {
        return message;
      }
    }

    // FastAPI validation error
    if (Array.isArray(detail) && detail.length > 0) {
      return detail[0]?.msg || "Validation error occurred";
    }

    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred while making the request"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

export const formatDate = (date: string) => {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
