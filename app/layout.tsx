import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./styles.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/userContext";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kanban Task Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-primary`}>
        <div className="flex flex-col md:flex-row w-[100%] h-[100vh]">
          <UserProvider>
            <Navbar />
            <div className="w-[100%] md:w-[80%] h-[100%]">{children}</div>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
