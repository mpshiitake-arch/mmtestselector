import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Statistical Test Selector",
  description: "MentorMost wizard for selecting statistical tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
