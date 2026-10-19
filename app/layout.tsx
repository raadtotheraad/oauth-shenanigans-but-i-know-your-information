import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Larry's Basement",
  description: "Larry needs your data",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <noscript>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
            <p className="text-center text-lg">
              Evil Larry needs JavaScript enabled to be able to steal your data.
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
