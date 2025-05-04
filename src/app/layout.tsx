import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxe Queer Magazine - Investment Portal",
  description: "Exclusive investment platform for Luxe Queer Magazine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-midnight text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
