import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "APT",
  description: "Hotels, Apartments, Resorts, and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-light">
        <NextTopLoader color="#b99d75" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
