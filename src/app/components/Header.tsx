import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

export default function Header(): React.JSX.Element {
  // আজকের তারিখ সার্ভারে ডাইনামিক রেন্ডারিং এড়াতে বা সহজ রাখতে রিমুভ করা হয়েছে (যদি প্রয়োজন হয় Banner বা অন্য কম্পোনেন্টে রাখতে পারেন)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      {/* HEADER TOP */}
      <div className="h-[80px] border-b border-slate-100">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + Title */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={34}
                height={34}
                priority
                className="h-8 w-8 object-contain brightness-0 invert"
              />
            </div>

            <div className="leading-none">
              <h1 className="text-[24px] font-bold tracking-tight text-[#1f2d27]">
                বাজার দর
              </h1>
              <p className="mt-2 text-[13px] font-medium text-slate-500">
                আজকের বাজার দর এক নজরে
              </p>
            </div>
          </Link>

          {/* User Info / Auth Section */}
          <UserInfo />
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <Suspense fallback={<div className="h-12 w-full animate-pulse bg-slate-100" />}>
        <NavLinks />
      </Suspense>
    </header>
  );
}