import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from '@next/font/google';
import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";

const poppins = Poppins({
  subsets: ['latin'], // Specify subsets according to your needs
  weight: ['400', '500', '600', '700'], // You can specify multiple weights
  style: ['normal', 'italic'], // You can specify styles
});

export const metadata: Metadata = {
  title: "BrainLeap",
  description: "Empowering minds, shaping future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="${poppins.className} dark">
          <ToasterProvider />
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
