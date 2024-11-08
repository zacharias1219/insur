import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
// import { Toaster } from '@/components/ui/toaster'
import {
  ClerkProvider,
  // SignInButton,
  SignedIn,
  SignedOut,
  // UserButton
} from '@clerk/nextjs'
// import Link from "next/link";
import LandingPage from "@/components/LandingPage";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <SignedIn>
            <main className="root bg-black">
              <Sidebar />
              {/* <MobileNav /> */}
              <div className="root-container">
                <div className="wrapper">
                  {children}
                </div>
              </div>
              {/* <Toaster /> */}
            </main>
          </SignedIn>        
        </body>
      </html>
    </ClerkProvider>
  );
}
