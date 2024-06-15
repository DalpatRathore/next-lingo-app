import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import ExitModal from "@/components/modals/ExitModal";
import HeartsModal from "@/components/modals/HeartsModal";
import PracticeModal from "@/components/modals/PracticeModal";
import { ThemeProvider } from "@/components/ui/theme-provider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster></Toaster>
            <ExitModal></ExitModal>
            <HeartsModal></HeartsModal>
            <PracticeModal></PracticeModal>
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
