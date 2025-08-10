import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";

import Sidebar from "@/components/layout/Sidebar";
import { Modal } from "@/components/molecules";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "WagWag Frontend",
  description: "WagWag Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kr"
      className={`${pretendard.variable}`}
    >
      <body className={`${pretendard.variable}`}>
        <div className="layout">
          <Sidebar />
          <main>{children}</main>
        </div>
        <Modal />
      </body>
    </html>
  );
}
