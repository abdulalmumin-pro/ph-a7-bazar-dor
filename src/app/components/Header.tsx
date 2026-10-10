import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import Marquee from "./Marquee";

export default function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      {/* HEADER TOP */}
      <div className="py-3 sm:h-[80px] sm:py-0 border-b border-slate-100 flex items-center">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2">
          {/* Logo + Title */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={34}
                height={34}
                priority
                className="h-7 w-7 sm:h-8 sm:w-8 object-contain brightness-0 invert"
              />
            </div>

            <div className="leading-tight min-w-0">
              <h1 className="text-lg sm:text-[24px] font-bold tracking-tight text-[#1f2d27] truncate">
                বাজার দর
              </h1>
              <p className="text-[11px] sm:text-[13px] font-medium text-slate-500 truncate">
                আজকের বাজার দর এক নজরে
              </p>
            </div>
          </Link>

          {/* User Info / Auth Section */}
          <div className="shrink-0">
            <UserInfo />
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <Suspense fallback={<div className="h-12 w-full animate-pulse bg-slate-100" />}>
        <NavLinks />
      </Suspense>

      {/* Marquee */}
      <Suspense fallback={<div className="h-10 w-full bg-[#f8faf9] animate-pulse" />}>
        <Marquee />
      </Suspense>
    </header>
  );
}