import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Authprovider from "@/context/authprovider";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: "Whissperly",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Authprovider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </Authprovider>
    </html>
  );
}
