import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipe App - Store Your Favorite Recipes",
  description: "A modern recipe management app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
