import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZ-Gamify",
  description: "Online games platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {children}
          <Toaster />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

// mcoder004
// 0oVxcnFpn1wvxyjw