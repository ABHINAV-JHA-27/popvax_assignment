import MainProvider from "@/provider/main_provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Study Analytics",
  description: "Study Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
