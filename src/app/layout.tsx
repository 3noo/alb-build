import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alb Build Steel Construction",
  description: "Industrial steel construction, fabrication, mounting, cladding, and portfolio management."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
