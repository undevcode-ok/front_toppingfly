import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/common/components/atoms/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toppingfly",
  description: "App para generar menús digitales para pizzerías, restaurantes y locales gastronómicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`flex justify-center items-center min-h-screen bg-linear-to-b from-white via-[#FFF3EC] to-[#FFE6D3] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster  position="top-center" />
      </body>
    </html>
  );
}
