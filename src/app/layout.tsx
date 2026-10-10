import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Suspense } from "react"; // ১. Suspense ইমপোর্ট করা হলো
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Marquee from "./components/Marquee";

const notoSans = Noto_Sans_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর - আজকের বাজার",
  description: "বাংলাদেশের বিভিন্ন পণ্যের প্রতিদিনের বাজার দর",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="bn"
      className={`${notoSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* Header-কে Suspense দিয়ে র‍্যাপ করা হলো */}
        <Suspense fallback={<div className="h-[80px] w-full bg-white border-b" />}>
          <Header />
        </Suspense>

        {/* Marquee-কে Suspense দিয়ে র‍্যাপ করা হলো */}
        <Suspense fallback={<div className="h-10 w-full bg-[#f8faf9] animate-pulse" />}>
          <Marquee />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>
        
        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}