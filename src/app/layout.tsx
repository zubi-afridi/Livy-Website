import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import AOSInit from "@/components/common/AOSInit";
import QueryProvider from "@/providers/QueryProvider";
import LanguageProvider from "@/providers/LanguageProvider";
import { Toaster } from "react-hot-toast";
import GlobalFloatingBtn from "@/components/layout/GlobalFloatingBtn";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Livy - Vacations Rental",
  description: "Find your perfect stay with Livy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased font-sans overflow-x-hidden`}
      >
        <QueryProvider>
          <LanguageProvider>
            <AOSInit />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <GlobalFloatingBtn />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
