import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Resume builder: create your resume in minutes",
  description: "Fastest resume builder on the internet, fill in your info and" +
    " download PDF. No account needed.",

};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <GoogleAnalytics/>
    <body className={inter.className}>{children}</body>
    </html>
  );
}
