import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
// import { Toaster } from '@/components/ui/toaster'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
// import Link from "next/link";
import LandingPage from "@/app/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Insur",
  description: "Blockchain Based Insurance Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#151F8C', 
      },
    }}>
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
