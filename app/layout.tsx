import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { TopBar } from "./components";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Maiboard",
  description: "Maiboard is a Kanban task board that helps you organize and manage your tasks efficiently.",
  keywords: ['Next.js', 'Maiboard', 'Kanboard', 'Task Board', 'DnD', 'Drag and Drop', 'Projects', 'Github', 'Open Source]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={quicksand.className}>
        <div className="mx-auto max-w-7xl space-y-2 md:p-2">
          <TopBar />
          {children}
        </div>
      </body>
    </html>
  );
}
