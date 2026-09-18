import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanmukh Sai — Brand Identity, Packaging & 3D Design",
  description: "Portfolio of Sanmukh Sai, a designer specializing in brand identity, packaging design and 3D product visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
