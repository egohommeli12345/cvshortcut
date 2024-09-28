import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Navigation from "@/components/Navigation";
import styles from "@/app/page.module.css";

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
    <body className={inter.className}>
    <p className={styles.appversion}>version: v.0.2</p>
    <Navigation/>
    {children}
    <div className={styles.footer}>
      <div className={styles.appfrom}>
        <p><strong>CVShortcut</strong> by Samuli Pirnes</p>
        <a href="https://samulipirnes.com/" target={"_blank"}
           rel={"noopener"}>samulipirnes.com</a>
      </div>
    </div>
    </body>
    </html>
  );
}
