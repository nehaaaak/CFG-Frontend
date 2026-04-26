import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/provider/query-provider";
import Header from "@/components/shared/header";
import { ThemeProvider } from "@/provider/theme-provider";
import CustomToaster from "@/components/toaster/custom-toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Control Flow",
  description:
    "Paste Python code below and generate an interactive control flow graph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter antialiased overflow-hidden`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider>
            <Header />
            <main
              style={{ height: "calc(100vh - 65px)" }}
              className="overflow-hidden"
            >
              {children}
              <CustomToaster />
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
