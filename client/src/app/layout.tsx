import type { Metadata } from "next";
import Head from "next/head";
import '@/../public/styles/satoshi.css'
import "./globals.css";

export const metadata: Metadata = {
  title: "SpotRem",
  description: "Special music platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Temporary solution for fonts */}
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
