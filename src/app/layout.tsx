import type { Metadata } from "next";
import "./globals.css";
import { ScrollAnimations } from "@/components/scroll-animations";

export const metadata: Metadata = {
  title: "Alb Build Steel Construction",
  description: "Industrial steel construction, fabrication, mounting, cladding, and portfolio management."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
