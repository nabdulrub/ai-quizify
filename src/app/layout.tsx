import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Quizify",
  description: "Create AI generated quizes for any topic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen pt-16")}>
        <Providers>
          <Navbar />
          <Toaster />
        </Providers>
        {children}
      </body>
    </html>
  );
}
